// src/api/fetchMonitoringData.js
export const fetchMonitoringData = async (earlyUrl, updateUrl) => {
  const validCycles = ['00', '06', '12', '18'];

  const response = {
    earlyHighlight: null,
    updateHighlight: null,
    error: null,
  };

  try {
    const [earlyResponse, updateResponse] = await Promise.all([
      fetch(earlyUrl),
      fetch(updateUrl),
    ]);

    if (!earlyResponse.ok) {
      throw new Error(
        `Failed to fetch ${earlyUrl}: ${earlyResponse.statusText} (Status: ${earlyResponse.status})`
      );
    }

    if (!updateResponse.ok) {
      throw new Error(
        `Failed to fetch ${updateUrl}: ${updateResponse.statusText} (Status: ${updateResponse.status})`
      );
    }

    const earlyText = (await earlyResponse.text()).trim();
    const updateText = (await updateResponse.text()).trim();

    response.earlyHighlight = validCycles.includes(earlyText)
      ? earlyText
      : null;
    response.updateHighlight = validCycles.includes(updateText)
      ? updateText
      : null;
  } catch (err) {
    console.error('Error fetching monitoring data:', err);
    response.error = err.message || 'Error fetching monitoring data.';
  }

  return response;
};
