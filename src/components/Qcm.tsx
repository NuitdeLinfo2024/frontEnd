import { useState } from "react";
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Button,
    Paper,
} from "@mui/material";

// Questions et réponses
const questions = [
    {
        question: "Les mangroves dans la mer jouent un rôle similaire à :",
        options: [
            { label: "La peau", isCorrect: false },
            { label: "Le système immunitaire", isCorrect: true },
            { label: "Les poumons", isCorrect: false },
            { label: "Le cerveau", isCorrect: false },
        ],
        explication: "Le système immunitaire : Les mangroves protègent les écosystèmes marins, tout comme le système immunitaire protège le corps humain. "
    },
    {
        question: "Les marées peuvent être comparées à quel organe du corps humain ?",
        options: [
            { label: "Les veines", isCorrect: false },
            { label: "Les globules rouges", isCorrect: false },
            { label: "Le cœur", isCorrect: true },
            { label: "Les poumons", isCorrect: false },
        ],
        explication: "Le cœur: Les marées régulent le flux de l'eau comme le cœur pompe le sang pour alimenter le corps. "
    },
    {
        question: "La peau fait penser à quelle partie de la mer :",
        options: [
            { label: "Le coeur", isCorrect: false },
            { label: "Les coraux", isCorrect: false },
            { label: "Les abysses", isCorrect: false },
            { label: "La surface", isCorrect: true },
        ],
        explication: "La surface: La peau protège le corps contre les aggressions extérieuses et régularise la température comme le fait la surface de l'eau"
    },
    {
        question: " Le plancton est l'équivalent de :",
        options: [
            { label: "Les cellules", isCorrect: true },
            { label: "Les os", isCorrect: false },
            { label: "Le cerveau", isCorrect: false },
            { label: "Le coeur", isCorrect: false },
        ],
        explication: "Les cellules: Le plancton est la base de la vie marine, tout comme les cellules sont les unités de base du corps humain. "
    },
    {
        question: "Les globules rouges sont importants pour l'homme, comme les ... pour la mer :",
        options: [
            { label: "Les mangroves", isCorrect: false },
            { label: "Les coraux", isCorrect: false },
            { label: "Les poissons", isCorrect: true },
            { label: "Les volcans", isCorrect: false },
        ],
        explication: "Les poissons: Ils transportent les nutriments pour maintenir l'équilibre écologique comme les globules rouges le font pour le corps"
    },
    {
        question: "Les algues dans la mer sont comparables à :",
        options: [
            { label: "Les os", isCorrect: false },
            { label: "La peau", isCorrect: false },
            { label: "Le cerveau", isCorrect: false },
            { label: "Les poumons", isCorrect: true },
        ],
        explication: "Les poumons: Tout comme les algues, les poumons joue un rôle vital à la respiration et le maintien de l'équilibre glocal"
    },
    {
        question: "Les volcans sous-marins sont les équivalents de ... pour la mer :",
        options: [
            { label: "Le cerveau", isCorrect: false },
            { label: "Les os", isCorrect: false },
            { label: "La chaleur corporelle", isCorrect: true },
            { label: "Le coeur", isCorrect: false },
        ],
        explication: "La chaleur corporelle: Les volcans sous-marins libèrent de la chaleur, comme la chaleur corporelle maintient le fonctionnement des organes. "
    },
    {
        question: "Les abysses peuvent être comparés à quel organe :",
        options: [
            { label: "Le coeur", isCorrect: false },
            { label: "Les cellules", isCorrect: false },
            { label: "Le cerveau", isCorrect: true },
            { label: "Le globules rouges", isCorrect: false },
        ],
        explication: "Le cerveau: Les abysses, riches en mystères et complexes, sont comparables au cerveau, centre de contrôle et de mystères de l’être humain. "
    },

];

const Qcm = () => {
    const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
    const [score, setScore] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleAnswerChange = (index: number, selectedOption: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = selectedOption;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        answers.forEach((answer, index) => {
          if (answer !== -1 && questions[index].options[answer].isCorrect) {
            correctAnswers += 1;
          }
        });
        setScore(correctAnswers);
        setSubmitted(true);
      };

    return (
        <Box sx={{ position: "relative", minHeight: "200vh", width: "100%" }}>
            {/* Image de fond */}
            <Box
                component="img"
                src="././public/images/bubbles.png"
                alt="Background"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1, // Place derrière le contenu
                }}
            />

            {/* Contenu principal */}
            <Box
                sx={{
                    position: "relative", // Position relative pour que le contenu soit au-dessus
                    padding: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    QCM : Les ressemblances entre le corps humain et la mer
                </Typography>
                <Paper sx={{ padding: 3 }}>
                    {questions.map((q, index) => (
                        <Box key={index} sx={{ marginBottom: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                {index + 1}. {q.question}
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={answers[index]}
                                    onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                                >
                                    {q.options.map((option, optionIndex) => (
                                        <FormControlLabel
                                            key={optionIndex}
                                            value={optionIndex}
                                            control={<Radio />}
                                            label={option.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            {/* Affichage des réponses et de la bonne réponse après soumission */}
                            {submitted && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        marginTop: 1,
                                        color:
                                            answers[index] === q.options.findIndex((opt) => opt.isCorrect)
                                                ? "success.main"
                                                : "error.main",
                                    }}
                                >
                                    Explication : {q.explication}
                                </Typography>
                            )}
                        </Box>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={answers.includes(-1)}
                    >
                        Soumettre
                    </Button>
                    {score !== null && (
                        <>
                            <Typography
                                variant="h6"
                                sx={{ marginTop: 3 }}
                                color={score === questions.length ? "success.main" : "error.main"}
                            >
                                Votre score : {score} / {questions.length}
                            </Typography>
                            {score === questions.length && (
                                <Box
                                    component="img"
                                    src="././public/images/crab.png"
                                    alt="Félicitations !!"
                                    sx={{
                                        marginTop: 3,
                                        width: "250px",
                                        height: "auto",
                                        borderRadius: 2,
                                    }}
                                />
                            )}
                            {score <= questions.length / 2 && (
                                <Box
                                    component="img"
                                    src="././public/images/nemo.jpg"
                                    alt="Vous pouvez encore vous améliorez !"
                                    sx={{
                                        marginTop: 3,
                                        width: "250px",
                                        height: "auto",
                                        borderRadius: 2,
                                    }}
                                />
                            )}
                            {score > questions.length / 2 && score != questions.length && (
                                <Box
                                    component="img"
                                    src="././public/images/dory.png"
                                    alt="Vous y êtes presque !"
                                    sx={{
                                        marginTop: 3,
                                        width: "250px",
                                        height: "auto",
                                        borderRadius: 2,
                                    }}
                                />
                            )}
                        </>
                    )}

                </Paper>
            </Box>
        </Box>
    );
};

export default Qcm;
