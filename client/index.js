const axios = require("axios");
const readline = require("readline");
const niceList = require("../utils/niceList.json");

const serverUrl = "http://localhost:1225";

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function sendGiftRequest(name) {
  if (!name) {
    console.log("错误：请输入有效的内容。");
    return;
  }

  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name, // 将用户输入作为请求体的一部分
      niceList, // 假设服务器需要 niceList 来验证
      // merkleRoot: MerkleTree.computeRoot(niceList), // 假设需要 Merkle 树的根
    });
    console.log({ gift });
  } catch (error) {
    console.error("请求失败:", error);
  }
}

function main() {
  console.log('按 Enter 发送请求，输入 "exit" 退出程序...');
  console.log("input your name:");
  // 循环等待用户输入
  rl.on("line", async (input) => {
    await sendGiftRequest(input.trim());

    console.log("input your name:");
  });

  // 处理 Ctrl+C
  process.on("SIGINT", () => {
    console.log("\napp exit");
    rl.close(); // 关闭 readline 接口
    process.exit(0); // 退出程序
  });
}

main();
