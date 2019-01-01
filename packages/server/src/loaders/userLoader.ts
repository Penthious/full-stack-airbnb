import * as DataLoader from "dataloader";
import { User } from "../entity/User";

type BatchUsers = (id: string[]) => Promise<User[]>;

const batchUsers: BatchUsers = async ids => {
  const users = await User.findByIds(ids);

  const userMap: { [key: string]: User } = {};
  users.forEach(user => (userMap[user.id] = user));

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);
