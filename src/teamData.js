import { supabase } from './supabaseClient.js'

export const fetchTeamData = async () => {
    const { data, error } = await supabase
        .from('teams')
        .select('*')

    if (error) {
        console.log('Error fetching teams: ', error);
        return [];
    }

    return data;
}