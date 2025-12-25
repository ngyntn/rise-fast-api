import styled, { keyframes } from "styled-components";

// Animation nhẹ nhàng khi dữ liệu xuất hiện
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HomeContainer = styled.div`
  /* Sử dụng font chữ hiện đại, mỏng */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  background-color: #fdfdfd; /* Trắng ngà cực nhẹ, đỡ chói hơn trắng tinh */
  color: #1a1a1a;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-weight: 200; /* Thin font weight */
    font-size: 2.5rem;
    margin: 0;
    letter-spacing: -0.05em; /* Kéo chữ lại gần nhau tạo cảm giác hiện đại */
    color: #111;
  }

  p {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #888;
    font-weight: 300;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  flex: 1;
  min-width: 400px;
  background: #ffffff;
  /* Viền siêu mỏng và nhẹ */
  border: 1px solid rgba(0, 0, 0, 0.06); 
  border-radius: 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  /* height: 600px; Cố định chiều cao để giao diện đều nhau */

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04); /* Đổ bóng cực mềm khi hover */
    /* transform: translateY(-2px); */
    border-color: rgba(0, 0, 0, 0.1);
  }

  .card-header {
    padding: 24px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);

    .meta {
      h3 {
        margin: 0;
        font-weight: 500;
        font-size: 1.1rem;
        color: #333;
      }
      .endpoint {
        display: block;
        font-size: 0.75rem;
        color: #999;
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        margin-top: 4px;
      }
    }
  }

  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    position: relative;
  }
`;

export const Button = styled.button`
  background: transparent;
  /* Viền mỏng 1px */
  border: 1px solid ${props => props.$primary ? '#000' : '#e0e0e0'};
  color: ${props => props.$primary ? '#000' : '#666'};
  padding: 10px 24px;
  font-size: 0.85rem;
  font-weight: 400;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background: ${props => props.$primary ? '#000' : '#f5f5f5'};
    color: ${props => props.$primary ? '#fff' : '#111'};
    border-color: ${props => props.$primary ? '#000' : '#d0d0d0'};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StatusBar = styled.div`
  padding: 8px 30px;
  font-size: 0.75rem;
  display: flex;
  gap: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.03);
  background-color: #fafafa;
  animation: ${fadeIn} 0.3s ease-out;

  .status {
    color: ${props => props.status === 200 ? '#10b981' : '#ef4444'}; /* Xanh lá hoặc Đỏ */
    font-weight: 600;
  }
  
  .time {
    color: #999;
  }
`;

export const JsonView = styled.div`
  flex: 1;
  padding: 20px 30px;
  overflow: auto;
  font-family: 'JetBrains Mono', 'Menlo', monospace; /* Font code xịn */
  font-size: 0.85rem;
  line-height: 1.6;
  color: #444;
  background-color: #fff;
  white-space: pre-wrap; /* Tự động xuống dòng */
  
  /* Scrollbar siêu mỏng và tinh tế */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }

  .placeholder {
    color: #d1d5db;
    font-style: italic;
    font-weight: 300;
  }
`;