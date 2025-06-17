export default function ErrorBanner({ message }) {
  return (
    <div style={{ color: "red", textAlign: "center", marginTop: 20 }}>
      {message}
    </div>
  );
}
