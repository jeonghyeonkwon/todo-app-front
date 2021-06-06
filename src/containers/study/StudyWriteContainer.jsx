import React, { useState, useCallback, useEffect } from 'react';
import CreateBoard from '../../components/main/CreateBoard';
import { withRouter } from 'react-router-dom';
const StudyWriteContainer = ({ location }) => {
  const skill = location.pathname.split('/')[2];
  const [form, setForm] = useState({
    title: '',
    contents: '',
    applicant: 0,
    programmingType: null,
  });
  const [tag, setTag] = useState([]);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === 'applicant' && value < 0) {
        setForm({
          ...form,
          applicant: 0,
        });
      } else {
        setForm({
          ...form,
          [name]: value,
        });
      }
    },
    [form],
  );
  const onChangeType = (e, v) => {
    if (v.length > 2) {
      const [trash, ...val] = v;
      setTag([...val]);
    } else {
      setTag([...v]);
    }
  };
  useEffect(() => {
    console.log(form);
  }, [form]);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <CreateBoard
      boardType="study"
      skill={skill}
      onChange={onChange}
      onChangeType={onChangeType}
      form={form}
      tag={tag}
    />
  );
};
export default withRouter(StudyWriteContainer);
