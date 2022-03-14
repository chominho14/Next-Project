import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "mynextapp",
  password: "90123091209381092830182319082310298301923123891023981028391283901",
});
