import Team from "./Team";
import User from "./User";

type Project = {
  id: number;
  name: string;
  internalReference: string;
  team: Team;
  developmentLead: User;

  createdAt: Date;
  updatedAt: Date;
}

export default Project;