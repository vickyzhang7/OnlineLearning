<template>
  <div class="question-paper">
    <question-paper @toggle-overlay="handleToggleOverlay" />
    <!-- 试卷内容 -->
    <div class="question-paper-header">
      <input
        type="text"
        placeholder="请输入试卷名称"
        v-model="paperTitle"
        class="custom-input"
      />
      <hr class="line" />
      <div class="name" style="margin-top: 15px;margin-bottom: 5px;">
        <span class="name-label">姓名 __________ </span>
        <span class="name-label">年级 __________ </span>
        <span class="name-label">分数 __________ </span>
      </div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <p>请输入试卷名称</p>
          <button @click="showModal = false">确定</button>
        </div>
      </div>
    </div>
    <div v-for="(question, questionIndex) in selectedQuestions" :key="question.id" class="question" style="margin-top: 10px;">
      {{ questionIndex + 1 }}. {{ question.content }}
      <!-- Display options if available -->
      <div v-if="question.options">
        <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="option">
          {{ String.fromCharCode(optionIndex + 65) }}. {{ option.slice(3) }}
        </div>
      </div>

    </div>
    <div class="question-paper-footer">
      <button class="button1" @click="downloadPdf">下载试卷</button>
      <button class="button2" @click="cancelDownload">取消下载</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCheckedStore } from "@/stores";
import { nextTick } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const questions = ref([]);
const generateData = getCheckedStore();
const paperTitle = ref('');
const showModal = ref(false);
const selectedQuestions = ref([]);


onMounted(() => {
  var data=''
  if(generateData.newbag==1){
     data=generateData.userBagList
  }else{
     data=generateData.userProblemList
  }
  selectedQuestions.value = data.map(item => ({
    id: item.data.problemId,
    content: item.data.body,
    options: item.data.options,
  }));
});

function downloadPdf() {
  if (!paperTitle.value.trim()) {
    showModal.value = true;
    return;
  }

  nextTick().then(() => {
    const questionPaperElement = document.querySelector('.question-paper');
    const footer = document.querySelector('.question-paper-footer'); // 获取页脚元素
    // 隐藏页脚
    footer.classList.add('hide');

    // Temporarily adjust styles if necessary
    questionPaperElement.style.position = 'initial';
    questionPaperElement.style.top = 'initial';
    questionPaperElement.style.left = 'initial';
    questionPaperElement.style.transform = 'none';

    html2canvas(questionPaperElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      scrollY: 0,
      scrollX: 0,
      windowWidth: questionPaperElement.scrollWidth,
      windowHeight: questionPaperElement.scrollHeight
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const imgWidth = 210; // A4 width in mm for portrait orientation
      const pageHeight = 297;  // A4 height in mm for portrait orientation
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image inside the loop to add new pages as needed
      while (heightLeft >= 0) {
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position = heightLeft - imgHeight;
        if (heightLeft > 0) {
          doc.addPage();
        }
      }
      footer.classList.remove('hide');
      doc.save(`${paperTitle.value || 'exam-paper'}.pdf`);
      questionPaperElement.style.position = 'fixed';
      questionPaperElement.style.top = '50%';
      questionPaperElement.style.left = '50%';
      questionPaperElement.style.transform = 'translate(-50%, -50%)';
    }).catch((error) => {
      footer.classList.remove('hide');
      console.error('Error capturing screenshot:', error);
    });
  });
}
const showOverlay = ref(false); 
const showQuestionPaperOverlay = ref(false);

const emit = defineEmits(['toggle-overlay']);
// const cancelDownload = () => {
//   console.log('Cancel download clicked');
//   showOverlay.value = false;
//   showQuestionPaperOverlay.value = false;
//   console.log('After cancellation - showOverlay:', showOverlay.value);
//   console.log('After cancellation - showQuestionPaperOverlay:', showQuestionPaperOverlay.value);
//   emit('toggle-overlay', false); // 确保父组件监听并处理这个事件
// }
const cancelDownload = () => {
  showOverlay.value = false;
  showQuestionPaperOverlay.value = false;
  emit('toggle-overlay', false); // Make sure the parent component listens for this event
}


onMounted(() => {
  // questions.value = generateData.userProblemList;
  // Use the selected questions passed as a prop
  questions.value = selectedQuestions.value;
});
</script>


<style scoped>
.question-paper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  width: 595px;
  height: 842px;
  flex-shrink: 0;
  background: #FFF;
  padding: 20px;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.question-paper-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
}

.custom-input {
  color: rgba(0, 0, 0, 0.5);
  font-family: Piazzolla;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  text-align: center;
  margin-bottom: 2px; 
  /* 添加其他可能需要的样式属性 */
}

.line {
  width: 330px;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 2px;
  stroke: rgba(37, 49, 61, 0.30);
}

.name-label {
  color: #000;
  font-family: Piazzolla;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.question-paper-footer {
  width: 595px;
  height: 60px;
  flex-shrink: 0;
  background: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}



/* Add styles for the buttons */
.button1 {
  width: 150px;
  height: 32px;
  flex-shrink: 0;
  background-color: #6666FF;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
}

.button2 {
  width: 150px;
  height: 32px;
  flex-shrink: 0;
  background-color: white;
  color:#6666FF;
  border: 1px solid #6666FF;
  border-radius: 20px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1011;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-content p {
  margin-bottom: 15px;
}

.modal-content button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #6666FF;
  color: white;
  border: none;
  border-radius: 5px;
}
.hide {
  display: none !important;
}


/* .question { */
  /* 添加其他问题的样式 */
/* } */
/* 111111111111111111111111111111111 */
/* 111111111111111111111111111111111 */
</style>

