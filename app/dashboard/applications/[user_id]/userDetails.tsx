export default function UserDetails({ user_id, appQuestions }: { user_id: string, appQuestions: any }) {
    return (
        <>
            <div className="container mx-auto py-10">
                {appQuestions.map((question: any) => {
                    return (
                        <div key={question.question_id} className="mb-5">
                            <h2 className="text-xl font-semibold">Question {question.question_id}: {question.question}</h2>
                        </div>
                    );
                })}
            </div>
        </>

    );
}