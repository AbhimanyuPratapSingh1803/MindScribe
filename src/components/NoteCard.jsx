import React, { useRef, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import DeleteButton from "./DeleteButton";
import Spinner from "../assets/Spinner";
import { useDispatch } from "react-redux";
import { changeCurrentNote } from "../utils/noteSlice";

const NoteCard = ({ note }) => {
    const bodyParser = (value) => {
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    };
    const colors = JSON.parse(note.colors);
    const body = bodyParser(note.body);
    const [pos, setPosition] = useState(JSON.parse(note.positions));
    const cardRef = useRef(null);
    const dispatch = useDispatch();

    const textAreaRef = useRef(null);
    let mouseStartPos = { x: 0, y: 0 };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            const noteDoc = doc(db, "notes", note.id);
            await updateDoc(noteDoc, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const handleKeyUp = async () => {
        setSaving(true);
        if (keyUpTimer.current) clearTimeout(keyUpTimer.current);

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };

    const mouseDown = (e) => {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("touchmove", mouseMove);
        document.addEventListener("touchend", mouseUp);
        zindex(cardRef.current);
        dispatch(changeCurrentNote(note));
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
        document.removeEventListener("touchmove", mouseMove);
        document.removeEventListener("touchend", mouseUp);

        const newpos = newOffset(cardRef.current);
        saveData("positions", newpos);
    };

    const mouseMove = (e) => {
        let moveDir = {
            x: mouseStartPos.x - (e.clientX || e.touches[0].clientX),
            y: mouseStartPos.y - (e.clientY || e.touches[0].clientY),
        };
        mouseStartPos.x = e.clientX || e.touches[0].clientX;
        mouseStartPos.y = e.clientY || e.touches[0].clientY;

        const newpos = newOffset(cardRef.current, moveDir);

        setPosition(newpos);
    };

    const newOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
        const left = card.offsetLeft - mouseMoveDir.x;
        const top = card.offsetTop - mouseMoveDir.y;

        return {
            x: left < 0 ? 0 : left,
            y: top < 0 ? 0 : top,
        };
    };

    useEffect(() => {
        autoGrow(textAreaRef);
        zindex(cardRef.current);
    }, []);

    const autoGrow = (textAreaRef) => {
        const { current } = textAreaRef;

        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    };

    const zindex = (currentCard) => {
        currentCard.style.zIndex = 999;
        document.querySelectorAll(".card").forEach((card) => {
            if (card !== currentCard) {
                card.style.zIndex = currentCard.style.zIndex - 1;
            }
        });
    };

    return (
        <div
            ref={cardRef}
            style={{
                backgroundColor: colors.colorBody,
                left: `${pos.x}px`,
                top: `${pos.y}px`,
            }}
            className={`card font-Poppins w-[300px] sm:w-[400px] rounded-lg cursor-pointer absolute shadow-lg bg-[${colors.colorBody}]`}>
            <div
                className="card-header bg-[#9bd1de] rounded-t-md flex justify-between items-center p-1.5 "
                onMouseDown={mouseDown}
                style={{ backgroundColor: colors.colorHeader }}>
                <div>
                    <DeleteButton id={note.id}/>
                </div>
                {saving && (
                    <div className="card-saving flex items-center gap-1">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>
                            Saving...
                        </span>
                    </div>
                )}
            </div>

            <div style={{ color: colors.colorText }}>
                <textarea
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        zindex(cardRef.current);
                        dispatch(changeCurrentNote(note));
                    }}
                    onInput={() => autoGrow(textAreaRef)}
                    ref={textAreaRef}
                    defaultValue={body}
                    className="card-body px-2 h-auto bg-inherit border-none size-full resize-none text-base focus:bg-inherit focus:size-full focus:outline-none"></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
