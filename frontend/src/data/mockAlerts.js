export const mockAlerts = [];

export const getActiveAlerts = () => mockAlerts.filter((a) => a.isActive);
export const getAlertById = (id) => mockAlerts.find((a) => a.id === id);
