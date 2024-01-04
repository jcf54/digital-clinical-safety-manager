import User from "./User";

type Team = {
    id: number;
    name: string;

    owner: Omit<User, 'scopes'>;
    members: Omit<User, 'scopes'>[];
}

export default Team;