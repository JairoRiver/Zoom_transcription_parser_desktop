import DocIcon from "./DocIcon"
import CheckIcon from "./CheckIcon"

const CardFile = (props) => {
    return (
        <section className="flex justify-center items-center my-2.5">
            <div className="border-solid border-2 border-sky-300 rounded-lg">
                <DocIcon/>
            </div>
            <p className="mx-2.5 text-base font-medium text-slate-800 max-w-80 border-b border-slate-400">{props.fileName}</p>
            <CheckIcon/>
            <p className="mx-2 text-sm text-slate-800">{props.fileStatus}</p>
        </section>
    )
}

export default CardFile