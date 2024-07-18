"use client";
import { useQuery } from "@apollo/client";
import { GetContactsQuery } from "@/+core/definegql";
import { useSession } from "next-auth/react";
import Spinner from "@/components/ui/spinner";
import { ContactInterface } from "@/+core/interfaces/contact";
import ContactDialog from "../../../components/contact/dialog";
import { ConfirmRemoveContactDialog } from "./components/confirmRemoveContact";

export default function Contact() {
  const { data: session } = useSession();
  const { data, loading, refetch } = useQuery(GetContactsQuery, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  if (loading) {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={80} />
          </div>
        </div>
      </div>
    );
  }

  let contacts: ContactInterface[] = [];
  if (data && data.contacts) {
    contacts = data.contacts;
  }

  return (
    <div className="p-8 w-full">
      <div className="flex flex-row-reverse mb-5">
        <ContactDialog refetchContacts={refetch} />
      </div>
      <div className="max-w-7xl max-h-[30rem] mx-auto bg-white p-6 rounded-none border shadow-md overflow-auto">
        {contacts.map((contact) => (
          <div className="border-b pb-6 mb-6 text-start flex justify-between">
            <div className="mb-4">
              <span className="font-bold">
                {contact.fullName} {contact.phoneNumber}
              </span>
              <span className="ml-5">
                {contact.detailAddress}, {contact.wards}, {contact.district},{" "}
                {contact.province}
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <ContactDialog
                refetchContacts={refetch}
                currentContact={contact}
              />
              <ConfirmRemoveContactDialog id={contact.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
