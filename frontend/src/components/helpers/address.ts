export function formatAddress(addr: string) {
  return (
    addr.substring(0, 6) + "..." + addr.substring(addr.length - 4, addr.length)
  );
}
