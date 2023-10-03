export default function ProgressBar({ progress }) {
  const color = progress < 35 ? "red" : (progress < 75 ? "#FFE135" : "green");

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{width:`${progress}%`, backgroundColor: color}}
      ></div>
    </div>
  );
}