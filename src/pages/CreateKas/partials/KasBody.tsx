import React, { useState, useEffect } from "react";
import CreateKasService, {
  UserType,
  SubmissionRequest,
} from "@services/CreateKas";
import Select from "react-select";
import { Image } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useUploadImage from "../hooks/useUploadImage";
import useCreateKasSubmission from "../hooks/useCreateKasSubmission";

const MySwal = withReactContent(Swal);

const KasBody: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [payedAmount, setPayedAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [monthCount, setMonthCount] = useState<number>(0);
  // const kasService = new CreateKasService();
  const { uploadFile, uriId } = useUploadImage();
  const { kasService, submissionKas } = useCreateKasSubmission();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await kasService.get();
        if (res && res.data) {
          setUsers(res.data);
        }
      } catch (err: any) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: err.message + " Error fetching users",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMonthCount = (count: number) => {
    setMonthCount(Math.max(0, count));
    setPayedAmount(10000 * Math.max(0, count));
  };

  const handlePayedAmountChange = (value: number) => {
    setPayedAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData: SubmissionRequest = {
      user: {
        npm: selectedUser ? selectedUser.value : "",
      },
      payed_amount: payedAmount,
      note: note,
      evidence: uriId,
    };
    try {
      const response = await kasService.post(JSON.stringify(submissionData));
      // const response = await axios.post(
      //   "https://api.fanesp.online/v1/kas-submissions",
      //   JSON.stringify({
      //     user: {
      //       npm: "2125240020",
      //     },
      //     payed_amount: 10000,
      //     note: "-",
      //     evidence: "cfmeqjczytlntcijxgwrzqwxsvwqrmvcmtimsixo-a.png",
      //   }),
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //   },
      // );
      if (response && response.status) {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Data created successfully!",
        });
        resetForm();
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Error creating submission",
        });
      }
    } catch (err: any) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Error creating submission",
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      try {
        await uploadFile(uploadedFile);
        setFile(uploadedFile);
      } catch (err: any) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: err.message || "Error uploading file",
        });
      }
    }
  };

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    setSelectedUser(selectedOption);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "kas_payed") {
      handlePayedAmountChange(parseInt(value, 10) || 0);
    } else if (name === "note") {
      setNote(value);
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setPayedAmount(0);
    setNote("");
    setFile(null);
    setMonthCount(0);
  };

  const options = users.map((user) => ({
    value: user.npm,
    label: `${user.npm} - ${user.name}`,
  }));

  return (
    <div className="p-4 text-dark-700">
      {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">NPM</label>
          <Select
            value={selectedUser}
            onChange={handleSelectChange}
            options={options}
            name="npm"
            placeholder="Search NPM..."
            className="w-full text-md text-black"
            isClearable
          />
        </div>
        <div className="mb-4">
          <label htmlFor="kas_payed" className="block mb-2">
            Payed Amount
          </label>
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={() => handleMonthCount(monthCount - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
            >
              -
            </button>
            <span className="px-4">{monthCount} Month</span>
            <button
              type="button"
              onClick={() => handleMonthCount(monthCount + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
            >
              +
            </button>
            <p className="text-green-600 mt-auto mb-auto flex gap-3">
              Rp.
              <input
                type="text"
                name="kas_payed"
                value={payedAmount}
                onChange={(e) =>
                  handlePayedAmountChange(parseInt(e.target.value) || 0)
                }
                className="w-sm w-20 border-bottom rounded-lg text-md bg-transparent"
              />
              , -
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="note" className="block mb-2">
            Note
          </label>
          <textarea
            name="note"
            value={note}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg text-md text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo">Evidence</label>
          <div className="flex items-center">
            <input
              type="file"
              name="photo"
              id="photo"
              onChange={handleFileChange}
              style={{ display: "none" }}
              className="text-white w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <label htmlFor="photo">
              {file ? (
                <>
                  <div className="ms-auto me-auto">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Evidence"
                      width="100px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-2 text-white">{file.name}</div>
                </>
              ) : (
                <>
                  <div className="ms-auto me-auto">
                    <Image style={{ fontSize: "20rem" }} />
                  </div>
                  <div className="text-white text-center">Upload Evidence</div>
                </>
              )}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KasBody;
