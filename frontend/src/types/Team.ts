import User from "./User";

type Team = {
    id: number;
    name: string;

    owner: User;
    members: User[];
}

export default Team;