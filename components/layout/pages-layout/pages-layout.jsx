function PagesLayout({ children, dir }) {
   return (
      <div dir={dir}>
         <main>{children}</main>
      </div>
   );
}

export default PagesLayout;
