import AssignmentEditor from "./Editor";

export default async function Assignment({params,}: {params: Promise<{cid: string; aid: string}>;}) {
  const {cid, aid} = await params;
    return (
      <div id="wd-assignment">
        <AssignmentEditor />
      
      </div>
  );}

  
  