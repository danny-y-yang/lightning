export interface ThoughtProps {
  title: string;
  text: string;
  author: string;
  date: string;
}

export default function Thought(props: ThoughtProps) {
  console.log(props.text);
  return (
    <div className="d-flex flex-column pt-5 align-items-center border-bottom border-secondary-subtle">
      <h3>{props.title}</h3>
      {props.author} | {props.date}
      <div
        className="pt-3"
        style={{
          width: "50%",
        }}
      >
        <p>
          {props.text.split("\n").map((frag) => (
            <div>{frag}</div>
          ))}
        </p>
      </div>
    </div>
  );
}
