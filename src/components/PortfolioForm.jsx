import React, { useState } from 'react';

const PortfolioForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    professionalSummary: '',
    experience: '',
    education: '',
    skills: '',
    github: '',
    linkedin: '',
    twitter: '',
    generatedPortfolio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/generate-portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const generatedPortfolio = await response.text();
    setFormData({ ...formData, generatedPortfolio });
  };

  return (
    <div>
      <h2>Portfolio Builder</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields here /}
        {/ Example:
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        */}
        <button type="submit">Generate Portfolio</button>
      </form>
      {formData.generatedPortfolio && (
        <div>
          <h3>Generated Portfolio</h3>
          <div dangerouslySetInnerHTML={{ __html: formData.generatedPortfolio }} />
        </div>
      )}
    </div>
  );
};

export default PortfolioForm;