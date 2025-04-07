import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const contactRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    create: protectedProcedure
    .input(z.object({ 
      prenom: z.string().min(1), 
      nom: z.string().min(1),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      adresse: z.string().optional(),
      description: z.string().optional(),

    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.contact.create({
        data: {
          prenom: input.prenom ?? "", // Ensure prenom is a string
          nom: input.nom ?? "", // Ensure nom is a string
          email: input.email ?? "", // Ensure email is a string
          phone: input.phone ?? null, // Ensure phone is a string or null
          adresse: input.adresse ?? null,
          description: input.description ?? null,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
    getLatest: protectedProcedure.query(async ({ ctx }) => {
      const post = await ctx.db.contact.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
      });
  
      return post ?? null;
    }),
  

});
  

