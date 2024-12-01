const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("안녕?");
});

app.get("/:id/:password", async (req, res) => {
  const { id, password } = req.params;
  console.log(id, password);
  // headless 브라우저 실행
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  // 새로운 페이지 열기
  const page = await browser.newPage();
  // dialog 핸들러를 여기서 등록
  await page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.goto("https://api.hanyang.ac.kr/oauth/login");

  await page.type("#uid", id);
  await page.type("#upw", password);
  await page.click("#login_btn");

  await page.goto("https://learning.hanyang.ac.kr/courses");

  /****************
   * 원하는 작업 수행 *
   ****************/
  const hrefs = await page.evaluate(() => {
    const links = document.querySelectorAll("a[href^='/courses/']");
    return Array.from(links)
      .map((a) => a.getAttribute("href"))
      .filter((href) => href !== "/courses/2");
  });
  console.log(hrefs);
  // [
  //   '/courses/160631',
  //   '/courses/157837',
  //   '/courses/157899',
  //   '/courses/160610',
  //   '/courses/160612',
  //   '/courses/160650',
  //   '/courses/159079'
  // ]
  const weekly = [];
  for (let i = 0; i < hrefs.length; i++) {
    const BASEURL = "https://learning.hanyang.ac.kr" + hrefs[i];
    await page.goto(BASEURL + "/external_tools/140");

    const frame = page.frames().find((f) => f.name() === "tool_content");
    await frame.waitForSelector(".xnmb-module-outer-wrapper");

    const week = await frame.evaluate(() => {
      const items = document.querySelectorAll(
        ".xnmb-module_item-outer-wrapper"
      );
      return Array.from(items)
        .filter(
          (item) =>
            item.querySelector(".xnmb-module_item-meta_data-not_attendance") ===
              null &&
            (item
              .querySelector(
                ".xnlal-attendance-list-item-meta_data-lecture_periods-unlock_at span"
              )
              ?.textContent?.trim() ||
              item
                .querySelector(
                  ".xnmb-module_item-meta_data-lecture_periods-unlock_at span"
                )
                ?.textContent?.trim())
        )
        .map((item) => ({
          title:
            item
              .querySelector(".xnmb-module_item-left-title")
              ?.textContent?.trim() || "",
          week:
            item
              .querySelector(".xnmb-module_item-meta_data-lesson_periods-week")
              ?.textContent?.trim() || "",
          lesson:
            item
              .querySelector(
                ".xnmb-module_item-meta_data-lesson_periods-lesson"
              )
              ?.textContent?.trim() || "",
          startTime:
            item
              .querySelector(
                ".xnlal-attendance-list-item-meta_data-lecture_periods-unlock_at span"
              )
              ?.textContent?.trim() ||
            item
              .querySelector(
                ".xnmb-module_item-meta_data-lecture_periods-unlock_at span"
              )
              ?.textContent?.trim() ||
            "",
          dueTime:
            item
              .querySelector(
                ".xnlal-attendance-list-item-meta_data-lecture_periods-due_at span"
              )
              ?.textContent?.trim() ||
            item
              .querySelector(
                ".xnmb-module_item-meta_data-lecture_periods-due_at span"
              )
              ?.textContent?.trim() ||
            "",
          endTime:
            item
              .querySelector(
                ".xnlal-attendance-list-item-meta_data-lecture_periods-lock_at span"
              )
              ?.textContent?.trim() ||
            item
              .querySelector(
                ".xnmb-module_item-meta_data-lecture_periods-lock_at span"
              )
              ?.textContent?.trim() ||
            "",
          status:
            item
              .querySelector(".xnmb-module_item-meta_data-attendance_status")
              ?.textContent?.trim() || "",
          professor:
            item
              .querySelector(
                ".xnmb-module_item-meta_data-lesson_periods-dates span"
              )
              ?.textContent?.trim() || "",
        }));
    });
    weekly.push(week);

    // 모든 스크래핑 작업을 마치고 브라우저 닫기
    console.log("주차학습", weekly);

    // const assignment = await page.evaluate(() => {
    //   const items = document.querySelectorAll(
    //     ".assignment.sort-disabled.search_show"
    //   );
    //   return Array.from(items)
    //     .filter((item) => {
    //       const statusDesc = item.querySelector(".status-description");
    //       return statusDesc && statusDesc.textContent === "닫힘";
    //     })
    //     .map((item) => ({
    //       title: item.querySelector(".ig-title")?.textContent?.trim(),
    //       due: item
    //         .querySelector(".assignment-date-due [data-html-tooltip-title]")
    //         ?.getAttribute("data-html-tooltip-title"),
    //       maxScore: item
    //         .querySelector(".score-display")
    //         ?.textContent?.trim()
    //         .split("/")[1],
    //       status: item.querySelector(".grade-display")?.textContent?.trim(),
    //     }));
    // });
  }
  // console.log("과제:", assignments);
  res.json(weekly);
  await page.close();
});

app.listen(3001);
