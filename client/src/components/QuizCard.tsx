import { useState } from 'react';


interface QuestionCardProps {
    question: string;
    answers: string[];
    correct: string;
    category: string;
    explanation: string;
  }


const QuizCard = () => {

    const [trivia, setTrivia] = useState<QuestionCardProps | null>(null)
    
    const getRandomQuestion = async () => {
        const url = 'https://quizmania-api.p.rapidapi.com/random-trivia';
        const options = {
            method: 'GET',
            headers: {
		'x-rapidapi-key': import.meta.env.VITE_QUIZMASTER_API_KEY,
		'x-rapidapi-host': 'quizmania-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    setTrivia(result)
    console.log("Here is trivia: ", trivia)
} catch (error) {
	console.error(error);
}



    }
return  (
        <>
        <div>
                {trivia === null?(
                    <p>Click da button!!!</p>
                ): (
                    <h2>Category: {trivia.category}</h2>
                    //<p></p>

                )
            }
        </div>
<button onClick={getRandomQuestion}>
    Get Random Question
</button>
</>
)
}

export default QuizCard
