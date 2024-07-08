import { createClient } from "@/utils/supabase/server";

export default async function getQuestions() {
    // Create a client
    const supabase = createClient();

    // Fetch questions
    const { data: questions, error: questionsError } = await supabase.from('questions').select();

    return {questions, questionsError};
}