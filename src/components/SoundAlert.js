import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import connects from "../store/connects";

const useStyles = makeStyles((theme) => ({
    soundAlert: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        overflow: "hidden",

        position: "absolute",
        top: 0,

        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 50000,

        "&.show": {
            display: "flex",
            padding: "0 10px",

            "&.critical": {
                background: "rgba(255, 51, 51, 0.5)",
            },
            "&.warning": {
                background: "rgba(51, 255, 51, 0.5)",
            },
            "&.text": {
                background: "rgba(51, 51, 255, 0.5)",
            },
        },

        "&.hide": {
            display: "none",
        },
    },

    message: {
        fontSize: 42,
        color: "#e5e5e5",
        "&.context": {},
        "&.text": {
            fontSize: 32,
        },
        // marginTop: theme.spacing(10),
    },
}));

export const SoundAlert = observer(() => {
    const classes = useStyles();

    const [isVisible, setVisible] = useState(false);
    const [voice, setVoice] = useState("");
    const [message, setMessage] = useState(<div className={`${classes.soundAlert} ${isVisible ? "show" : "hide"}`}/>);
    const [triggerWords, setTriggerWords] = useState([]);

    const recognizer = new window.webkitSpeechRecognition();
    const controlWords = ["перелить", "переливаем", "ночью", "пожар", "огонь", "дым", "топливо", "авария", "удар", "сольем", "слив", "слить"];

    useEffect(() => {
        if (voice.length === 0) return;

        setVisible(true);

    }, [voice]);
    useEffect(() => {
        setMessage(recognitionMessage(voice));
    }, [isVisible, voice]);



    const recognitionMessage = () => {
        switch (voice) {
            // case "critical": {
            case "критическая ошибка": {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} critical`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{voice}</div>
                    </div>
                )
            }
            case "предупреждаю": {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} warning`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{voice}</div>
                    </div>
                )
            }
            case "текст": {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} text`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{voice}</div>
                    </div>
                )
            }
            default: {
                return (
                    <div
                        className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} text`}
                        onClick={handleClose}
                    >
                        <div className={classes.message}>{voice}</div>
                    </div>
                )
            }
        }
    }
    const handleClose = () => {
        setVisible(false);
    }

    recognizer.interimResults = true;
    recognizer.lang = 'ru-Ru';

    recognizer.onresult = (event) => {
        const result = event.results[event.resultIndex];
        if (result.isFinal) {
            const msg = result[0].transcript.toLowerCase()
            const words = msg.split(" ");
            // console.log(words);

            const foundWord = [];
            words.forEach((word) => {
                const tempWord = controlWords.find((cWord) => cWord === word);
                if (tempWord?.length) foundWord.push(tempWord);
            });

            // console.log(msg);

            if (foundWord.length) {
                setTriggerWords(foundWord);
                setVoice(msg);
            }

            // setVoice(msg);
            // console.log(`Текст: ${msg}`);
            setTimeout(() => recognizer.start(), 100);
            // setTimeout(() => recognizer.start(), 100);
        }
    };

    recognizer.start();

    return (
        <div
            className={`${classes.soundAlert} ${isVisible ? "show" : "hide"} critical`}
            onClick={handleClose}
        >
            <div className={`${classes.message} context`}>
                {triggerWords.map((word) => {
                    return (
                        <span> {word} </span>
                    )
                })}
            </div>
            <div className={`${classes.message} text`}>контекст: {voice}</div>
        </div>
    );
});