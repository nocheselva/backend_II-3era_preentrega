export const getEvents = (req, res) => {
  try {
    // Retorna lista vacía como solicita la consigna inicial
    res.status(200).json({
      status: 'success',
      payload: []
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};