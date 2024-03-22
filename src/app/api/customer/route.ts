import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import {
  postCustomerHandler,
  getCustomerHandler,
  patchCustomerHandler,
  getAllCustomerHandler,
  removeCustomerHandler,
} from "./index";

const initKindeServerSession = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }

  return await getUser();
}

export async function GET(req : NextRequest) {
  const user:any = await initKindeServerSession();
  const url = new URL(req.url);
  let data:any;
  if (url.search === "?all") {
    data = await getAllCustomerHandler({ id: user.id });
  } else {
    data = await getCustomerHandler({ id: user.id, });
  }

  return NextResponse.json({ data });
}

export async function POST(req:any) {
  const { id }:any = await initKindeServerSession();
  const payload = await req.json();
  payload.agencyId = id
  const data = await postCustomerHandler({
    req: payload,
  });

  return NextResponse.json({ data });
}

export async function PATCH(req:any) {
  const user:any = await initKindeServerSession();
  const payload = await req.json();

  const data = await patchCustomerHandler({
    id: user.id,
    data: payload,
  });

  return NextResponse.json({ data });
}

export async function DELETE(req:any) {
  const user:any = await initKindeServerSession();
  const payload = await req.json();

  const data = await removeCustomerHandler({
    id: user.id,
    data: payload,
  });

  return NextResponse.json({ data });
}
