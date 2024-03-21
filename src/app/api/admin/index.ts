import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postHandler({ id, req }: { id: any, req: any }) {
  return await createAdminDb(req.body, id);
}

export async function getHandler({ id }: { id: any }) {
  return await fetchAdminDb({ id });
}

export async function patchHandler({ data, id }: { data: any, id: any }) {
  return await updateAdminDb(data, id);
}

interface AdminProfileData {
  id: string;
  firstName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
}

async function createAdminDb(payload: AdminProfileData, id: any) {
  const { firstName, email, companyName, phoneNumber } = payload;
  try {
    return await prisma.admins.create({
      data: {
        id: id,
        firstName,
        email,
        companyName,
        phoneNumber,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateAdminDb(data: any, id: any) {
  try {
    const res = await prisma.admins.update({
      where: { id: id || '' },
      data: data.data
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function fetchAdminDb({ id }: { id:string }) {
  try {
    return await prisma.admins.findUnique({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
}

