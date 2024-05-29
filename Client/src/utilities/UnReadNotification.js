const unreadnotificationFucn = (notificaiton) => {
  if (notificaiton) {
    return notificaiton.filter((n) => n.isRead === false);
  }
};

export { unreadnotificationFucn };
