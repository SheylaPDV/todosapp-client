import "./textArea.css";

function TextArea() {
  return (
    <>
      <table className='text-area-table'>
        <tr>
          <td>
            <textarea
              placeholder='No te olvides de...'
              className='text-area'
            ></textarea>
          </td>
        </tr>
      </table>
    </>
  );
}

export default TextArea;
