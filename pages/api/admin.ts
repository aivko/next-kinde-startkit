import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let parsedCookies: any;
  try {
    const cookies = req.cookies['user'];
    if (cookies != null) {
      parsedCookies = JSON.parse(cookies);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    let result;
    if (req.method === 'POST' && req.url === '/api/admin') {
      result = await createAdminDb(req.body, parsedCookies);
    } else if (req.method === 'GET' && req.url === '/api/admin') {
      result = await fetchAdminDb(req.body, parsedCookies );
    } else if (req.method === 'PATCH' && req.url === '/api/admin') {
      result = await updateAdminDb(req.body, parsedCookies);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}

interface AdminProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
}

async function createAdminDb(payload: AdminProfileData, parsedCookies: any) {
  const { firstName, lastName, email, companyName, phoneNumber } = payload;
  try {
    return await prisma.admins.create({
      data: {
        id: parsedCookies.id || '',
        firstName,
        lastName,
        email,
        companyName,
        phoneNumber,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateAdminDb(payload: { data: object }, parsedCookies: any) {
  const { data } = payload;
  try {
    return await prisma.admins.update({
      where: { id: parsedCookies.id || '' },
      data
    });
  } catch (error) {
    throw error;
  }
}

async function fetchAdminDb(payload: any, parsedCookies: any) {
  try {
    return await prisma.admins.findUniqueOrThrow({
      where: { id: parsedCookies.id || '' },
    });
  } catch (error) {
    throw error;
  }
}
