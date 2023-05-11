import {
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import { link } from "fs";
import { FC, useState, useRef } from "react";
import { HiPlus } from "react-icons/hi";
import { api } from "~/utils/api";

interface AddApplicationModalProps {
  userId: string;
  createApplication: ReturnType<typeof api.application.create.useMutation>;
}

export const AddApplicationModal: FC<AddApplicationModalProps> = function ({
  userId,
  createApplication,
}) {
  const [isOpen, setOpen] = useState(false);
  // using useRef to get the value of the input field without having to re-render the component
  // which would happen with useState
  const titleInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const statusInputRef = useRef<HTMLSelectElement>(null);
  const dateAppliedInputRef = useRef<HTMLInputElement>(null);
  const linkAppliedInputRef = useRef<HTMLInputElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add Application
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add new application</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <div className="mt-1">
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Software Engineer Intern"
                  required={true}
                  ref={titleInputRef}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <div className="mt-1">
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Google"
                  required={true}
                  ref={companyInputRef}
                />
              </div>
            </div>
            <div className="mb-1 grid grid-cols-1 gap-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" ref={statusInputRef}>
                <option>Applied</option>
                <option>Interested</option>
                <option>Interview Phase</option>
                <option>Received Offer</option>
                <option>Rejected</option>
              </Select>
            </div>
            <div className="mb-1 grid grid-cols-1 gap-y-2">
              <Label htmlFor="date">Date Applied</Label>
              <TextInput
                id="date"
                name="date"
                placeholder="e.g., 15/08/1990"
                required
                type="date"
                ref={dateAppliedInputRef}
              />
            </div>
            <div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-2">
              <Label htmlFor="link">Link</Label>
              <div className="mt-1">
                <TextInput
                  id="link"
                  name="link"
                  placeholder="google.com"
                  type="url"
                  ref={linkAppliedInputRef}
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Applied through referral."
                rows={6}
                className="mt-1"
                ref={notesInputRef}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              createApplication.mutate({
                userId: userId,
                title: titleInputRef.current?.value ?? "",
                company: companyInputRef.current?.value ?? "",
                status: statusInputRef.current?.value ?? "",
                dateApplied: new Date(
                  dateAppliedInputRef.current?.value ?? new Date()
                ), //TODO: the application is currently only working when a user specifies a date applied
                link: linkAppliedInputRef.current?.value ?? "",
                notes: notesInputRef.current?.value ?? "",
              });
              setOpen(false);
            }}
          >
            Add application
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
