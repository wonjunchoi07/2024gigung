async function fetchVisitor() {
    const fetchData = await fetch("./visitors.json");
    const parseData = await fetchData.json();
    return parseData["data"];
}

function updateChartAndTable(visitorData, leagueName, day, orientation){
    const league = visitorsData.find((l) => l.name === leagueName); 
    const dayData = league.visitors.find((d) => d.day === day);
    const visitorData = dayData.visitor;

    $("#visitorTable").empty();
    $("visitorTable").append(`<thead><tr><th>시간대</th><th>방문자 수</th></thead>`);
    const tbody = $("<tbody></tbody>");
    for (const [time, count] of Object.entries(visitorData)){
        tbody.append('<tr><td>${time}</td><td>${count}</td></tr>');
    }
    $("#visitorTable").append(tbody);

    $("#chartArea").empty();
    if (orientation === "horizontal") {
        const chartContainer = $("<div></div>");
        Object.entries(visitorData).forEach(([time, count]) => {
          const percentage = (count / 500) * 100;
          const bar = $(`
              <div class="d-flex align-items-center" style="margin-bottom: 10px;">
                  <div style="width: ${percentage}%; min-width: 20px; height: 20px; background-color: #007bff; color: white;">${count}</div>
                  <span class="ml-2">${time}</span>
              </div>
          `);
          chartContainer.append(bar);
        });
        $("#chartArea").css({
            display: "block",
        });
        $("#chartArea").append(chartContainer);
    }else{
        const chartContainer = $("<div class='d-flex align-items-end' style='height: 200px;'></div>");
        Object.entries(visitorData).forEach((time, count) => {
            const barHeight = (count / 500) * 200;
            const bar = $(`
            <div class="d flex flex-column align-items-center" style="margin-right: 10px;">
            <div class="bar" style="width: 50px; height: ${barHeight}px; background-color: #007bff; color: white; display: flex; align-items: flex-end; justify-cotent: center;">${count}</div>
            <span>${time}</span>
            </div>
            `);
            chartContainer.append(bar);
        });
        $("#chartArea").append(chartContainer);
    }
}
async function initBaseballParkChart(){
    const visitorsData = await fetchVisitor();

    visitorsData.forEach((league) => {
        $("#leagueSelect").append(new Option(league.name, league.name));
    });

    const days = ["월", "화", "수", "목", "금", "토", "일"];
    days.forEach((day) => {
        $("#daySelect").append(new Option(day, day));
        
    }); 
}