import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext();

/**
 * It fetches feedback from the database and sets the state of the feedback array to the response.
 */
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  /**
   * When the component mounts, fetch the feedback data from the server and set the state of the
   * feedback and isLoading variables.
   */
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // Add feedback
  /**
   * It takes a newFeedback object, sends it to the server, and then adds it to the feedback array.
   * @param newFeedback - {
   */
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  /**
   * It deletes a feedback item from the database and the frontend.
   * @param id - the id of the feedback item to delete
   */
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Update feedback item
  /**
   * It takes an id and an updated item, and then it updates the feedback array with the updated item.
   * @param id - the id of the feedback item to be updated
   * @param updItem - {
   */
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // Set item to be updated
  /**
   * When the editFeedback function is called, it sets the feedbackEdit state to the item that was
   * passed in and sets the edit state to true.
   * @param item - {
   */
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
