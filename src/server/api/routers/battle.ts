import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

import { startBattle } from "~/server/services/battle.service";

export const battleRouter = createTRPCRouter({
  start: protectedProcedure.mutation(() => {
    const result = startBattle();
    return result;
  }),
});
