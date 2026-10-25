import assert from 'node:assert/strict';

async function checkLive() {
  const res1 = await fetch('http://localhost:5173/');
  assert.equal(res1.status, 200, 'Main HTML should return 200');

  const res2 = await fetch('http://localhost:5173/api/bootstrap');
  assert.equal(res2.status, 200, 'Bootstrap API should return 200');
  const data = await res2.json();
  assert.equal(data.reports.length, 20, 'Live server should return 20 reports');

  const res3 = await fetch('http://localhost:5173/photos/pothole-1.jpg');
  assert.equal(res3.status, 200, 'Photo asset should return 200');
  const buf = await res3.arrayBuffer();
  assert.equal(buf.byteLength > 10000, true, 'Photo should be > 10KB real JPEG');

  console.log(`LIVE CHECK PASSED: HTTP 200 on /, /api/bootstrap (${data.reports.length} reports), and /photos/pothole-1.jpg (${buf.byteLength} bytes)`);
}

checkLive().catch((e) => {
  console.error(e);
  process.exit(1);
});
