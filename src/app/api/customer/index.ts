import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postCustomerHandler({ req }: { req: any }) {
  return await createCustomerDb(req);
}

export async function getCustomerHandler({ id }: { id: any }) {
  return await fetchCustomerDb({ id });
}

export async function getAllCustomerHandler({ id }: { id: any }) {
  return await fetchAllCustomerDb({ id });
}

export async function patchCustomerHandler({ data, id }: { data: any, id: any }) {
  return await updateCustomerDb(data, id);
}

export async function removeCustomerHandler({ data, id }: { data: any, id: any }) {
  return await removeCustomerDb(data, id);
}

interface CustomerProfileData {
  id: string;
  email: string;
  vat: string;
  iban: string;
  firstName: string;
  companyName: string;
  operationAddress: string;
  operationPostCode: string;
  operationProvince: string;
  operationCity: string;
  officeAddress: string;
  officePostCode: string;
  officeCity: string;
  officeProvince: string;
  phoneNumber: string;
  mobileNumber: string;
  notes: string;
}

async function createCustomerDb(payload: CustomerProfileData) {
  try {
    return await prisma.customer.create({
      data: {
        ...payload
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateCustomerDb(data: any, id: any) {
  try {
    const res = await prisma.customer.update({
      where: { id: id || '' },
      data: data.data
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function fetchAllCustomerDb({ id }: { id:string }) {
  try {
    return await prisma.customer.findMany({
      where: { agencyId: id },
    });
  } catch (error) {
    throw error;
  }
}

async function fetchCustomerDb({ id }: { id:string }) {
  try {
    return await prisma.customer.findUnique({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
}

async function removeCustomerDb(data: any, id: any) {
  try {
    return await prisma.customer.delete({
      where: {
        id: data,
        agencyId: id
      },
    });
  } catch (error) {
    throw error;
  }
}

