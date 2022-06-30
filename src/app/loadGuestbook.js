const fs = require('fs');

const loadGuestbook = (guestbook, commentPath) => (req, res) => {
  const { pathname } = req.url;
  if (pathname === '/add-comment' || pathname === '/guest-book' || pathname.startsWith('/api/')) {
    req.guestbook = guestbook;
    req.saveComments = (guestbook) => {
      const content = JSON.stringify(guestbook.comments);
      fs.writeFileSync(commentPath, content, 'utf-8');
    };
  }
  return false;
};
exports.loadGuestbook = loadGuestbook;
