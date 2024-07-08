import UserDetails from "./userDetails";
import Intro from "@/components/intro";
import MessageAcceptor from "@/components/message-acceptor";
import getUserDetails from "@/server/user-details";
import getQuestions from "@/server/questions";

export default async function Page({ params }: { params: { user_id: string } }) {
    const { fetchedDetails, detailsError } = await getUserDetails(params.user_id);
    const { questions, questionsError } = await getQuestions();
    
    
    if (detailsError) {
        return <div>Error fetching user details: {detailsError.message}</div>;
    }

    if (questionsError) {
        return <div>Error fetching questions: {questionsError.message}</div>;
    }

    return (
        <>
            <Intro
                header="Review User Applications"
                description="View the application details that a user submitted. Update the status after reviewing. Please note that the user's details are confidential and should not be shared with anyone."
            />
            <UserDetails user_id={params.user_id} appQuestions={questions} />
            <MessageAcceptor />
        </>
        
    )
}