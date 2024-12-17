import Modal from "react-modal";
import { eventFormStyle } from "../common/modal/style";

export default function CalendarModal({
  isOpen,
  handleCloseModal,
  selectedInfo,
  handleCreateEvent,
}) {
  console.log(isOpen);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={eventFormStyle}
    >
      <div className="modal-header">
        <h2 className="text-xl font-bold">일정 생성</h2>
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="modal-body mt-4">
        {selectedInfo && (
          <div>
            <p>시작: {selectedInfo.startStr}</p>
            <p>종료: {selectedInfo.endStr}</p>
            <p>종일: {selectedInfo.allDay ? "예" : "아니오"}</p>
          </div>
        )}
      </div>

      <div className="modal-footer mt-6 flex justify-end gap-2">
        <button
          onClick={handleCloseModal}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          취소
        </button>
        <button
          onClick={() => handleCreateEvent({ title: "새 일정" })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          생성
        </button>
      </div>
    </Modal>
  );
}
