function Share(props) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-5">{props.text}</p>
      <input
        type="text"
        readOnly
        value={props.shareUrl}
        className="p-2 text-white"
        onClick={(e) => e.target.select()}
      />
    </div>
  );
}

export default Share;
