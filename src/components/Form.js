import React, { useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
const Form = () => {
  let { idData } = useParams();
  const { state, handleFunction } = useContext(GlobalContext);
  const { input, setInput, setCurrentId } = state;

  const { handleInput, handleSubmit } = handleFunction;

  useEffect(() => {
    console.log(idData);
    if (idData !== undefined) {
      setCurrentId(idData);
      axios
        .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
        .then((res) => {
          console.log(res);
          let data = res.data;

          setInput({
            title: data.title,
            job_description: data.job_description,
            job_qualification: data.job_qualification,
            job_type: data.job_tenure,
            job_tenure: data.job_tenure,
            job_status: data.job_status,
            company_name: data.company_name,
            company_image_url: data.company_image_url,
            company_city: data.company_city,
            salary_min: data.salary_min,
            salary_max: data.salary_min,
          });
        });
    }
  }, []);

  return (
    <div className="md:container md:mx-auto p-12">
      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="title" value="Title :" />
          </div>
          <TextInput
            id="title"
            name="title"
            type="text"
            value={input.title}
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="job_description" value="Job Description :" />
          </div>
          <TextInput
            id="job_description"
            name="job_description"
            type="text"
            value={input.job_description}
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="job_qualification" value="Job Qualification :" />
          </div>
          <TextInput
            id="job_qualification"
            name="job_qualification"
            value={input.job_qualification}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="job_type" value="Job Type :" />
          </div>
          <TextInput
            id="job_type"
            name="job_type"
            value={input.job_type}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="job_tenure" value="Job Tenure :" />
          </div>
          <TextInput
            id="job_tenure"
            name="job_tenure"
            value={input.job_tenure}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="job_status" value="Job Status :" />
          </div>
          <TextInput
            id="job_status"
            name="job_status"
            value={input.job_status}
            type="number"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="company_name" value="Company Name :" />
          </div>
          <TextInput
            id="company_name"
            name="company_name"
            value={input.company_name}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="company_image_url" value="Company Image URL :" />
          </div>
          <TextInput
            id="company_image_url"
            name="company_image_url"
            value={input.company_image_url}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="company_city" value="Company City :" />
          </div>
          <TextInput
            id="company_city"
            name="company_city"
            value={input.company_city}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="salary_min" value="Salary minimum : " />
          </div>
          <TextInput
            id="salary_min"
            name="salary_min"
            value={input.salary_min}
            type="number"
            onChange={handleInput}
            required={true}
          />
        </div>

        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="salary_max" value="Salary maximum : " />
          </div>
          <TextInput
            id="salary_max"
            name="salary_max"
            value={input.salary_max}
            type="number"
            onChange={handleInput}
            required={true}
          />
        </div>

        <Button className="w-32" type={"submit"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
