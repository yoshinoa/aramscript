function Share(props) {
  return (
    <div className="flex flex-col items-center py-10">
      <p className="mb-5">
        Copy this link to share the team setup with your friends:
      </p>
      <input
        type="text"
        readOnly
        value={props.shareUrl}
        className="p-2 text-black"
        onClick={(e) => e.target.select()}
      />
    </div>
  );
}

export default Share;
