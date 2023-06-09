import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Table, Checkbox, Button, Pagination } from "flowbite-react";
import { AddApplicationModal } from "~/components/AddApplicationModal";

import { api } from "~/utils/api";
import { Header } from "~/components/Header";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Header />
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const { data: applications, refetch: refetchApplications } =
    api.application.getAll.useQuery(
      {
        userId: sessionData?.user.id as string,
      },
      {
        enabled: sessionData?.user !== undefined,
      }
    );

  const createApplication = api.application.create.useMutation({
    onSuccess: () => {
      void refetchApplications();
    },
  });

  const deleteApplication = api.application.delete.useMutation({
    onSuccess: () => {
      void refetchApplications();
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <AddApplicationModal
        userId={sessionData?.user.id as string}
        createApplication={createApplication}
      />
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell className="!p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Link</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {applications?.map((application) => (
            <Table.Row
              key={application.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="!p-4">
                <Checkbox />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {application.title}
              </Table.Cell>
              <Table.Cell>{application.company}</Table.Cell>
              <Table.Cell>{application.status}</Table.Cell>
              <Table.Cell>{application.link}</Table.Cell>
              <Table.Cell>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        currentPage={1}
        onPageChange={() => {
          console.log("page changed");
        }}
        showIcons={true}
        totalPages={100}
      />
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

// THE REST OF THE STUFF FROM THE TUTORIAL WHICH HAS DAISYUI CODE

// type Topic = RouterOutputs["topic"]["getAll"][0];

// const Content: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

//   const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
//     undefined, // no input
//     {
//       enabled: sessionData?.user !== undefined,
//       onSuccess: (data) => {
//         setSelectedTopic(selectedTopic ?? data[0] ?? null);
//       },
//     }
//   );

//   const createTopic = api.topic.create.useMutation({
//     onSuccess: () => {
//       void refetchTopics();
//     },
//   });

//   const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
//     {
//       topicId: selectedTopic?.id ?? "",
//     },
//     {
//       enabled: sessionData?.user !== undefined && selectedTopic !== null,
//     }
//   );

//   const createNote = api.note.create.useMutation({
//     onSuccess: () => {
//       void refetchNotes();
//     },
//   });

//   const deleteNote = api.note.delete.useMutation({
//     onSuccess: () => {
//       void refetchNotes();
//     },
//   });

//   return (
//     <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
//       <div className="px-2">
//         <ul className="menu rounded-box bg-base-100 w-56 p-2">
//           {topics?.map((topic) => (
//             <li key={topic.id}>
//               <a
//                 href="#"
//                 onClick={(evt) => {
//                   evt.preventDefault();
//                   setSelectedTopic(topic);
//                 }}
//               >
//                 {topic.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//         <div className="divider"></div>
//         <input
//           type="text"
//           placeholder="New Topic"
//           className="input-bordered input input-sm w-full"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               createTopic.mutate({
//                 title: e.currentTarget.value,
//               });
//               e.currentTarget.value = "";
//             }
//           }}
//         />
//       </div>
//       <div className="col-span-3">
//         <div>
//           {notes?.map((note) => (
//             <div key={note.id} className="mt-5">
//               <NoteCard
//                 note={note}
//                 onDelete={() => void deleteNote.mutate({ id: note.id })}
//               />
//             </div>
//           ))}
//         </div>

//         <NoteEditor
//           onSave={({ title, content }) => {
//             void createNote.mutate({
//               title,
//               content,
//               topicId: selectedTopic?.id ?? "",
//             });
//           }}
//         />
//       </div>
//     </div>
//   );
// };
