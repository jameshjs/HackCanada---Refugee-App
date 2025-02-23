"use client";

import React, { useState } from "react";

const LANGUAGE = 0;
const UPLOAD = 1;
const UPLOADING = 2;
const EDIT = 3;

const languages = [
  { "name": 'English', "code": "en" },
  { "name": 'Français', "code": "fr" },
  { "name": 'Español', "code": "es" },
  { "name": 'Deutsch', "code": "de" },
  { "name": 'Italiano', "code": "it" },
  { "name": 'Português', "code": "pt" },
  { "name": 'Русский', "code": "ru" },
  { "name": 'العربية', "code": "ar" },
  { "name": '简体中文', "code": "zh-CN" }, // Simplified Chinese
  { "name": '繁體中文', "code": "zh-TW" }, // Traditional Chinese
  { "name": '日本語', "code": "ja" },
  { "name": '한국어', "code": "ko" },
  { "name": 'हिन्दी', "code": "hi" },
  { "name": 'বাংলা', "code": "bn" },
  { "name": 'தமிழ்', "code": "ta" },
  { "name": 'اردو', "code": "ur" },
  { "name": 'Türkçe', "code": "tr" },
  { "name": 'Polski', "code": "pl" },
  { "name": 'Nederlands', "code": "nl" },
  { "name": 'Ελληνικά', "code": "el" },
  { "name": 'Tiếng Việt', "code": "vi" },
  { "name": 'עברית', "code": "he" },
  { "name": 'ไทย', "code": "th" },
  { "name": 'Filipino', "code": "fil" },
  { "name": 'Українська', "code": "uk" },
  { "name": 'Svenska', "code": "sv" },
  { "name": 'Čeština', "code": "cs" },
  { "name": 'Magyar', "code": "hu" },
  { "name": 'Suomi', "code": "fi" },
  { "name": 'Română', "code": "ro" },
];

const strings = {
  "en": {
    "uploadGovernmentForms": "Upload Government Forms",
    "dragDrop": "Drag & Drop or Click to Select",
    "upload": "Upload",
    "completeDocument": "Complete the Document",
    "possibleOptions": "Possible options",
    "validate": "Validate",
    "validHappy": "Valid!",
    "askQuestions": "Ask Question",
    "submit": "Submit",
    "notAllValid": "Not all fields have been validated!",
    "whatIsQuestion": "What is your question?",
    "uploadFailed": "Failed to upload!",
    "uploadSuccess": "File uploaded successfully!",
    "uploadingGenerating": "Uploading and generating content...",
    "selectFile": "Please select a file to upload."
  },
  "fr": {
    "uploadGovernmentForms": "Télécharger les formulaires gouvernementaux",
    "dragDrop": "Glisser-déposer ou cliquer pour sélectionner",
    "upload": "Télécharger",
    "completeDocument": "Compléter le document",
    "possibleOptions": "Options possibles",
    "validate": "Valider",
    "validHappy": "Valide !",
    "askQuestions": "Poser une question",
    "submit": "Soumettre",
    "notAllValid": "Tous les champs ne sont pas validés !",
    "whatIsQuestion": "Quelle est votre question ?",
    "uploadFailed": "Échec du téléchargement !",
    "uploadSuccess": "Fichier téléchargé avec succès !",
    "uploadingGenerating": "Téléchargement et génération de contenu...",
    "selectFile": "Veuillez sélectionner un fichier à télécharger."
  },
  "es": {
    "uploadGovernmentForms": "Subir formularios gubernamentales",
    "dragDrop": "Arrastrar y soltar o hacer clic para seleccionar",
    "upload": "Subir",
    "completeDocument": "Completar el documento",
    "possibleOptions": "Opciones posibles",
    "validate": "Validar",
    "validHappy": "¡Válido!",
    "askQuestions": "Hacer una pregunta",
    "submit": "Enviar",
    "notAllValid": "¡No todos los campos han sido validados!",
    "whatIsQuestion": "¿Cuál es tu pregunta?",
    "uploadFailed": "¡Error al subir!",
    "uploadSuccess": "¡Archivo subido con éxito!",
    "uploadingGenerating": "Subiendo y generando contenido...",
    "selectFile": "Por favor, seleccione un archivo para subir."
  },
  "de": { // German
    "uploadGovernmentForms": "Regierungsformulare hochladen",
    "dragDrop": "Ziehen & Ablegen oder Klicken zum Auswählen",
    "upload": "Hochladen",
    "completeDocument": "Dokument vervollständigen",
    "possibleOptions": "Mögliche Optionen",
    "validate": "Validieren",
    "validHappy": "Gültig!",
    "askQuestions": "Frage stellen",
    "submit": "Einreichen",
    "notAllValid": "Nicht alle Felder wurden validiert!",
    "whatIsQuestion": "Was ist Ihre Frage?",
    "uploadFailed": "Hochladen fehlgeschlagen!",
    "uploadSuccess": "Datei erfolgreich hochgeladen!",
    "uploadingGenerating": "Hochladen und Inhalt wird generiert...",
    "selectFile": "Bitte wählen Sie eine Datei zum Hochladen aus."
  },
  "it": { // Italian
    "uploadGovernmentForms": "Carica moduli governativi",
    "dragDrop": "Trascina e rilascia o clicca per selezionare",
    "upload": "Carica",
    "completeDocument": "Completa il documento",
    "possibleOptions": "Opzioni possibili",
    "validate": "Convalida",
    "validHappy": "Valido!",
    "askQuestions": "Fai una domanda",
    "submit": "Invia",
    "notAllValid": "Non tutti i campi sono stati convalidati!",
    "whatIsQuestion": "Qual è la tua domanda?",
    "uploadFailed": "Caricamento fallito!",
    "uploadSuccess": "File caricato con successo!",
    "uploadingGenerating": "Caricamento e generazione del contenuto in corso...",
    "selectFile": "Si prega di selezionare un file da caricare."
  },
  "pt": { // Portuguese
    "uploadGovernmentForms": "Carregar Formulários Governamentais",
    "dragDrop": "Arraste e Solte ou Clique para Selecionar",
    "upload": "Carregar",
    "completeDocument": "Completar o Documento",
    "possibleOptions": "Opções possíveis",
    "validate": "Validar",
    "validHappy": "Válido!",
    "askQuestions": "Fazer Pergunta",
    "submit": "Enviar",
    "notAllValid": "Nem todos os campos foram validados!",
    "whatIsQuestion": "Qual é a sua pergunta?",
    "uploadFailed": "Falha no upload!",
    "uploadSuccess": "Arquivo carregado com sucesso!",
    "uploadingGenerating": "Carregando e gerando conteúdo...",
    "selectFile": "Por favor, selecione um arquivo para carregar."
  },
  "ru": { // Russian
    "uploadGovernmentForms": "Загрузить государственные формы",
    "dragDrop": "Перетащите или нажмите для выбора",
    "upload": "Загрузить",
    "completeDocument": "Заполнить документ",
    "possibleOptions": "Возможные варианты",
    "validate": "Проверить",
    "validHappy": "Действительно!",
    "askQuestions": "Задать вопрос",
    "submit": "Отправить",
    "notAllValid": "Не все поля были проверены!",
    "whatIsQuestion": "Какой у вас вопрос?",
    "uploadFailed": "Ошибка загрузки!",
    "uploadSuccess": "Файл успешно загружен!",
    "uploadingGenerating": "Загрузка и создание контента...",
    "selectFile": "Пожалуйста, выберите файл для загрузки."
  },
  "ar": { // Arabic
    "uploadGovernmentForms": "تحميل النماذج الحكومية",
    "dragDrop": "اسحب وأفلت أو انقر للتحديد",
    "upload": "تحميل",
    "completeDocument": "أكمل المستند",
    "possibleOptions": "خيارات محتملة",
    "validate": "تحقق",
    "validHappy": "صالح!",
    "askQuestions": "اطرح سؤالاً",
    "submit": "إرسال",
    "notAllValid": "لم يتم التحقق من جميع الحقول!",
    "whatIsQuestion": "ما هو سؤالك؟",
    "uploadFailed": "فشل التحميل!",
    "uploadSuccess": "تم تحميل الملف بنجاح!",
    "uploadingGenerating": "جارٍ التحميل وإنشاء المحتوى...",
    "selectFile": "يرجى اختيار ملف للتحميل."
  },
  "zh-CN": {
    "uploadGovernmentForms": "上传政府表格",
    "dragDrop": "拖放或点击选择",
    "upload": "上传",
    "completeDocument": "完成文档",
    "possibleOptions": "可能的选项",
    "validate": "验证",
    "validHappy": "有效！",
    "askQuestions": "提问",
    "submit": "提交",
    "notAllValid": "并非所有字段都已验证！",
    "whatIsQuestion": "你的问题是什么？",
    "uploadFailed": "上传失败！",
    "uploadSuccess": "文件上传成功！",
    "uploadingGenerating": "正在上传并生成内容...",
    "selectFile": "请选择一个文件上传。"
  },
  "zh-TW": {
    "uploadGovernmentForms": "上傳政府表格",
    "dragDrop": "拖放或點擊選擇",
    "upload": "上傳",
    "completeDocument": "完成文件",
    "possibleOptions": "可能的選項",
    "validate": "驗證",
    "validHappy": "有效！",
    "askQuestions": "提問",
    "submit": "提交",
    "notAllValid": "並非所有欄位都已驗證！",
    "whatIsQuestion": "你的問題是什麼？",
    "uploadFailed": "上傳失敗！",
    "uploadSuccess": "文件上傳成功！",
    "uploadingGenerating": "正在上傳並生成內容...",
    "selectFile": "請選擇一個文件上傳。"
  },
  "ja": { // Japanese
    "uploadGovernmentForms": "政府の書類をアップロード",
    "dragDrop": "ドラッグ＆ドロップまたはクリックして選択",
    "upload": "アップロード",
    "completeDocument": "ドキュメントを完成させる",
    "possibleOptions": "可能なオプション",
    "validate": "検証する",
    "validHappy": "有効です！",
    "askQuestions": "質問する",
    "submit": "送信",
    "notAllValid": "すべてのフィールドが検証されているわけではありません！",
    "whatIsQuestion": "あなたの質問は何ですか？",
    "uploadFailed": "アップロードに失敗しました！",
    "uploadSuccess": "ファイルが正常にアップロードされました！",
    "uploadingGenerating": "アップロード中およびコンテンツを生成中...",
    "selectFile": "アップロードするファイルを選択してください。"
  },
  "ko": { // Korean
    "uploadGovernmentForms": "정부 양식 업로드",
    "dragDrop": "드래그 앤 드롭 또는 클릭하여 선택",
    "upload": "업로드",
    "completeDocument": "문서 완성",
    "possibleOptions": "가능한 옵션",
    "validate": "검증",
    "validHappy": "유효합니다!",
    "askQuestions": "질문하기",
    "submit": "제출",
    "notAllValid": "모든 필드가 검증된 것은 아닙니다!",
    "whatIsQuestion": "질문이 무엇인가요?",
    "uploadFailed": "업로드 실패!",
    "uploadSuccess": "파일이 성공적으로 업로드되었습니다!",
    "uploadingGenerating": "업로드 중 및 콘텐츠 생성 중...",
    "selectFile": "업로드할 파일을 선택하세요."
  },
  "hi": { // Hindi
    "uploadGovernmentForms": "सरकारी फॉर्म अपलोड करें",
    "dragDrop": "खींचें और छोड़ें या चयन करने के लिए क्लिक करें",
    "upload": "अपलोड करें",
    "completeDocument": "दस्तावेज़ पूरा करें",
    "possibleOptions": "संभावित विकल्प",
    "validate": "सत्यापित करें",
    "validHappy": "वैध!",
    "askQuestions": "प्रश्न पूछें",
    "submit": "प्रस्तुत करें",
    "notAllValid": "सभी फ़ील्ड सत्यापित नहीं हुए हैं!",
    "whatIsQuestion": "आपका प्रश्न क्या है?",
    "uploadFailed": "अपलोड विफल!",
    "uploadSuccess": "फ़ाइल सफलतापूर्वक अपलोड हो गई!",
    "uploadingGenerating": "अपलोड हो रहा है और सामग्री उत्पन्न हो रही है...",
    "selectFile": "कृपया अपलोड करने के लिए एक फ़ाइल चुनें।"
  },
  "bn": { // Bengali
    "uploadGovernmentForms": "সরকারি ফর্ম আপলোড করুন",
    "dragDrop": "ড্র্যাগ এবং ড্রপ করুন বা নির্বাচন করতে ক্লিক করুন",
    "upload": "আপলোড",
    "completeDocument": "নথি সম্পূর্ণ করুন",
    "possibleOptions": "সম্ভাব্য বিকল্পগুলি",
    "validate": "বৈধতা যাচাই করুন",
    "validHappy": "বৈধ!",
    "askQuestions": "প্রশ্ন জিজ্ঞাসা করুন",
    "submit": "জমা দিন",
    "notAllValid": "সমস্ত ক্ষেত্র বৈধতা যাচাই করা হয়নি!",
    "whatIsQuestion": "আপনার প্রশ্ন কি?",
    "uploadFailed": "আপলোড ব্যর্থ হয়েছে!",
    "uploadSuccess": "ফাইল সফলভাবে আপলোড হয়েছে!",
    "uploadingGenerating": "আপলোড হচ্ছে এবং সামগ্রী তৈরি হচ্ছে...",
    "selectFile": "অনুগ্রহ করে আপলোড করার জন্য একটি ফাইল নির্বাচন করুন।"
  },
  "ta": { // Tamil
    "uploadGovernmentForms": "அரசு படிவங்களைப் பதிவேற்றவும்",
    "dragDrop": "இழுத்து விடவும் அல்லது தேர்வு செய்ய கிளிக் செய்யவும்",
    "upload": "பதிவேற்றவும்",
    "completeDocument": "ஆவணத்தை முடிக்கவும்",
    "possibleOptions": "சாத்தியமான விருப்பங்கள்",
    "validate": "சரிபார்க்கவும்",
    "validHappy": "செல்லுபடியாகும்!",
    "askQuestions": "கேள்வி கேட்கவும்",
    "submit": "சமர்ப்பிக்கவும்",
    "notAllValid": "அனைத்து புலங்களும் சரிபார்க்கப்படவில்லை!",
    "whatIsQuestion": "உங்கள் கேள்வி என்ன?",
    "uploadFailed": "பதிவேற்றம் தோல்வியடைந்தது!",
    "uploadSuccess": "கோப்பு வெற்றிகரமாக பதிவேற்றப்பட்டது!",
    "uploadingGenerating": "பதிவேற்றப்படுகிறது மற்றும் உள்ளடக்கத்தை உருவாக்குகிறது...",
    "selectFile": "பதிவேற்ற ஒரு கோப்பைத் தேர்ந்தெடுக்கவும்."
  },
  "ur": { // Urdu
    "uploadGovernmentForms": "حکومتی فارم اپ لوڈ کریں",
    "dragDrop": "کھینچیں اور چھوڑیں یا منتخب کرنے کے لیے کلک کریں",
    "upload": "اپ لوڈ کریں",
    "completeDocument": "دستاویز مکمل کریں",
    "possibleOptions": "ممکنہ اختیارات",
    "validate": "تصدیق کریں",
    "validHappy": "درست!",
    "askQuestions": "سوال پوچھیں",
    "submit": "جمع کریں",
    "notAllValid": "تمام فیلڈز کی تصدیق نہیں ہوئی ہے!",
    "whatIsQuestion": "آپ کا سوال کیا ہے؟",
    "uploadFailed": "اپ لوڈ ناکام ہوگیا!",
    "uploadSuccess": "فائل کامیابی سے اپ لوڈ ہوگئی!",
    "uploadingGenerating": "اپ لوڈ ہو رہا ہے اور مواد تیار ہو رہا ہے...",
    "selectFile": "براہ کرم اپ لوڈ کرنے کے لیے ایک فائل منتخب کریں۔"
  },
  "tr": { // Turkish
    "uploadGovernmentForms": "Devlet Formlarını Yükle",
    "dragDrop": "Sürükle ve Bırak veya Seçmek İçin Tıkla",
    "upload": "Yükle",
    "completeDocument": "Belgeyi Tamamla",
    "possibleOptions": "Olası Seçenekler",
    "validate": "Doğrula",
    "validHappy": "Geçerli!",
    "askQuestions": "Soru Sor",
    "submit": "Gönder",
    "notAllValid": "Tüm alanlar doğrulanmadı!",
    "whatIsQuestion": "Sorunuz nedir?",
    "uploadFailed": "Yükleme başarısız oldu!",
    "uploadSuccess": "Dosya başarıyla yüklendi!",
    "uploadingGenerating": "Yükleniyor ve içerik oluşturuluyor...",
    "selectFile": "Lütfen yüklemek için bir dosya seçin."
  },
  "pl": { // Polish
    "uploadGovernmentForms": "Prześlij Formularze Rządowe",
    "dragDrop": "Przeciągnij i Upuść lub Kliknij, aby Wybrać",
    "upload": "Prześlij",
    "completeDocument": "Uzupełnij Dokument",
    "possibleOptions": "Możliwe opcje",
    "validate": "Zatwierdź",
    "validHappy": "Ważne!",
    "askQuestions": "Zadaj Pytanie",
    "submit": "Zatwierdź",
    "notAllValid": "Nie wszystkie pola zostały zweryfikowane!",
    "whatIsQuestion": "Jakie jest twoje pytanie?",
    "uploadFailed": "Nie udało się przesłać!",
    "uploadSuccess": "Plik został pomyślnie przesłany!",
    "uploadingGenerating": "Przesyłanie i generowanie treści...",
    "selectFile": "Proszę wybrać plik do przesłania."
  },
  "nl": { // Dutch
    "uploadGovernmentForms": "Overheidsformulieren Uploaden",
    "dragDrop": "Sleep en Zet Neer of Klik om te Selecteren",
    "upload": "Uploaden",
    "completeDocument": "Voltooi het Document",
    "possibleOptions": "Mogelijke opties",
    "validate": "Valideren",
    "validHappy": "Geldig!",
    "askQuestions": "Stel een Vraag",
    "submit": "Indienen",
    "notAllValid": "Niet alle velden zijn gevalideerd!",
    "whatIsQuestion": "Wat is uw vraag?",
    "uploadFailed": "Uploaden mislukt!",
    "uploadSuccess": "Bestand succesvol geüpload!",
    "uploadingGenerating": "Bezig met uploaden en inhoud genereren...",
    "selectFile": "Selecteer een bestand om te uploaden."
  },
  "el": { // Greek
    "uploadGovernmentForms": "Ανεβάστε Κυβερνητικές Φόρμες",
    "dragDrop": "Σύρετε και Αποθέστε ή Κάντε Κλικ για Επιλογή",
    "upload": "Ανέβασμα",
    "completeDocument": "Ολοκληρώστε το Έγγραφο",
    "possibleOptions": "Πιθανές επιλογές",
    "validate": "Επικύρωση",
    "validHappy": "Έγκυρο!",
    "askQuestions": "Κάντε Ερώτηση",
    "submit": "Υποβολή",
    "notAllValid": "Δεν έχουν επικυρωθεί όλα τα πεδία!",
    "whatIsQuestion": "Ποια είναι η ερώτησή σας;",
    "uploadFailed": "Η μεταφόρτωση απέτυχε!",
    "uploadSuccess": "Το αρχείο μεταφορτώθηκε με επιτυχία!",
    "uploadingGenerating": "Μεταφόρτωση και δημιουργία περιεχομένου...",
    "selectFile": "Παρακαλώ επιλέξτε ένα αρχείο για μεταφόρτωση."
  },
  "vi": { // Vietnamese
    "uploadGovernmentForms": "Tải lên Biểu mẫu Chính phủ",
    "dragDrop": "Kéo & Thả hoặc Nhấp để Chọn",
    "upload": "Tải lên",
    "completeDocument": "Hoàn thành Tài liệu",
    "possibleOptions": "Các tùy chọn khả thi",
    "validate": "Xác thực",
    "validHappy": "Hợp lệ!",
    "askQuestions": "Đặt Câu hỏi",
    "submit": "Gửi đi",
    "notAllValid": "Không phải tất cả các trường đều đã được xác thực!",
    "whatIsQuestion": "Câu hỏi của bạn là gì?",
    "uploadFailed": "Tải lên thất bại!",
    "uploadSuccess": "Tệp đã được tải lên thành công!",
    "uploadingGenerating": "Đang tải lên và tạo nội dung...",
    "selectFile": "Vui lòng chọn một tệp để tải lên."
  },
  "he": { // Hebrew
    "uploadGovernmentForms": "העלה טפסים ממשלתיים",
    "dragDrop": "גרור ושחרר או לחץ כדי לבחור",
    "upload": "העלה",
    "completeDocument": "השלם את המסמך",
    "possibleOptions": "אפשרויות אפשריות",
    "validate": "אמת",
    "validHappy": "תקף!",
    "askQuestions": "שאל שאלה",
    "submit": "שלח",
    "notAllValid": "לא כל השדות אומתו!",
    "whatIsQuestion": "מה השאלה שלך?",
    "uploadFailed": "ההעלאה נכשלה!",
    "uploadSuccess": "הקובץ הועלה בהצלחה!",
    "uploadingGenerating": "מעלה ויוצר תוכן...",
    "selectFile": "אנא בחר קובץ להעלאה."
  },
  "th": { // Thai
    "uploadGovernmentForms": "อัปโหลดแบบฟอร์มของรัฐบาล",
    "dragDrop": "ลากและวางหรือคลิกเพื่อเลือก",
    "upload": "อัปโหลด",
    "completeDocument": "กรอกเอกสารให้สมบูรณ์",
    "possibleOptions": "ตัวเลือกที่เป็นไปได้",
    "validate": "ตรวจสอบ",
    "validHappy": "ถูกต้อง!",
    "askQuestions": "ถามคำถาม",
    "submit": "ส่ง",
    "notAllValid": "ยังไม่ได้ตรวจสอบทุกฟิลด์!",
    "whatIsQuestion": "คำถามของคุณคืออะไร?",
    "uploadFailed": "การอัปโหลดล้มเหลว!",
    "uploadSuccess": "อัปโหลดไฟล์สำเร็จ!",
    "uploadingGenerating": "กำลังอัปโหลดและสร้างเนื้อหา...",
    "selectFile": "โปรดเลือกไฟล์เพื่ออัปโหลด."
  },
  "fil": { // Filipino
    "uploadGovernmentForms": "I-upload ang mga Form ng Pamahalaan",
    "dragDrop": "I-drag at I-drop o I-click para Pumili",
    "upload": "I-upload",
    "completeDocument": "Kumpletuhin ang Dokumento",
    "possibleOptions": "Mga posibleng pagpipilian",
    "validate": "Patunayan",
    "validHappy": "Tama!",
    "askQuestions": "Magtanong",
    "submit": "Ipasa",
    "notAllValid": "Hindi lahat ng mga field ay napatunayan!",
    "whatIsQuestion": "Ano ang iyong tanong?",
    "uploadFailed": "Nabigo ang pag-upload!",
    "uploadSuccess": "Matagumpay na na-upload ang file!",
    "uploadingGenerating": "Nag-a-upload at bumubuo ng nilalaman...",
    "selectFile": "Pakitukoy ang file na i-upload."
  },
  "uk": { // Ukrainian
    "uploadGovernmentForms": "Завантажити урядові форми",
    "dragDrop": "Перетягніть і відпустіть або натисніть для вибору",
    "upload": "Завантажити",
    "completeDocument": "Заповнити документ",
    "possibleOptions": "Можливі варіанти",
    "validate": "Перевірити",
    "validHappy": "Дійсний!",
    "askQuestions": "Задати питання",
    "submit": "Надіслати",
    "notAllValid": "Не всі поля перевірені!",
    "whatIsQuestion": "Яке ваше питання?",
    "uploadFailed": "Не вдалося завантажити!",
    "uploadSuccess": "Файл успішно завантажено!",
    "uploadingGenerating": "Завантаження та створення вмісту...",
    "selectFile": "Будь ласка, виберіть файл для завантаження."
  },
  "sv": { // Swedish
    "uploadGovernmentForms": "Ladda upp myndighetsformulär",
    "dragDrop": "Dra och släpp eller klicka för att välja",
    "upload": "Ladda upp",
    "completeDocument": "Slutför dokumentet",
    "possibleOptions": "Möjliga alternativ",
    "validate": "Validera",
    "validHappy": "Giltig!",
    "askQuestions": "Ställ fråga",
    "submit": "Skicka in",
    "notAllValid": "Alla fält har inte validerats!",
    "whatIsQuestion": "Vad är din fråga?",
    "uploadFailed": "Uppladdning misslyckades!",
    "uploadSuccess": "Filen har laddats upp framgångsrikt!",
    "uploadingGenerating": "Laddar upp och genererar innehåll...",
    "selectFile": "Vänligen välj en fil att ladda upp."
  },
  "cs": { // Czech
    "uploadGovernmentForms": "Nahrát vládní formuláře",
    "dragDrop": "Přetáhněte a pusťte nebo klikněte pro výběr",
    "upload": "Nahrát",
    "completeDocument": "Dokončit dokument",
    "possibleOptions": "Možné možnosti",
    "validate": "Ověřit",
    "validHappy": "Platné!",
    "askQuestions": "Položit otázku",
    "submit": "Odeslat",
    "notAllValid": "Ne všechna pole byla ověřena!",
    "whatIsQuestion": "Jaká je vaše otázka?",
    "uploadFailed": "Nahrání selhalo!",
    "uploadSuccess": "Soubor byl úspěšně nahrán!",
    "uploadingGenerating": "Nahrávání a generování obsahu...",
    "selectFile": "Vyberte soubor k nahrání."
  },
  "hu": { // Hungarian
    "uploadGovernmentForms": "Kormányzati űrlapok feltöltése",
    "dragDrop": "Húzza és ejtse, vagy kattintson a kiválasztáshoz",
    "upload": "Feltöltés",
    "completeDocument": "Dokumentum befejezése",
    "possibleOptions": "Lehetséges lehetőségek",
    "validate": "Érvényesítés",
    "validHappy": "Érvényes!",
    "askQuestions": "Kérdés feltevése",
    "submit": "Beküldés",
    "notAllValid": "Nem minden mező lett érvényesítve!",
    "whatIsQuestion": "Mi a kérdése?",
    "uploadFailed": "A feltöltés nem sikerült!",
    "uploadSuccess": "A fájl sikeresen feltöltve!",
    "uploadingGenerating": "Feltöltés és tartalom generálás...",
    "selectFile": "Kérjük, válasszon ki egy fájlt a feltöltéshez."
  },
  "fi": { // Finnish
    "uploadGovernmentForms": "Lataa hallituksen lomakkeet",
    "dragDrop": "Vedä ja pudota tai napsauta valitaksesi",
    "upload": "Lataa",
    "completeDocument": "Täydennä asiakirja",
    "possibleOptions": "Mahdolliset vaihtoehdot",
    "validate": "Vahvista",
    "validHappy": "Kelvollinen!",
    "askQuestions": "Esitä kysymys",
    "submit": "Lähetä",
    "notAllValid": "Kaikkia kenttiä ei ole vahvistettu!",
    "whatIsQuestion": "Mikä on kysymyksesi?",
    "uploadFailed": "Lataus epäonnistui!",
    "uploadSuccess": "Tiedosto ladattiin onnistuneesti!",
    "uploadingGenerating": "Ladataan ja luodaan sisältöä...",
    "selectFile": "Valitse ladattava tiedosto."
  },
  "ro": { // Romanian
    "uploadGovernmentForms": "Încărcați formularele guvernamentale",
    "dragDrop": "Trageți și plasați sau faceți clic pentru a selecta",
    "upload": "Încărcați",
    "completeDocument": "Completați documentul",
    "possibleOptions": "Opțiuni posibile",
    "validate": "Validați",
    "validHappy": "Valabil!",
    "askQuestions": "Puneți o întrebare",
    "submit": "Trimiteți",
    "notAllValid": "Nu toate câmpurile au fost validate!",
    "whatIsQuestion": "Care este întrebarea dumneavoastră?",
    "uploadFailed": "Încărcarea a eșuat!",
    "uploadSuccess": "Fișierul a fost încărcat cu succes!",
    "uploadingGenerating": "Se încarcă și se generează conținut...",
    "selectFile": "Vă rugăm să selectați un fișier de încărcat."
  }
}

const UploadBox: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [questions, setQuestions] = useState([]);
  const [uploadId, setUploadId] = useState(0)
  const [language, setLanguage] = useState<string>("")
  const [languageName, setLanguageName] = useState<string>("")
  const [currentState, setCurrentState] = useState(LANGUAGE)

  const [input, setInput] = useState<Record<number, string>>({});
  const [valid, setValid] = useState<Record<number, boolean>>({});
  const [inputTranslations, setInputTranslations] = useState<Record<number, string>>({});

  const getString = (tag: string) => {
    const selectedLanguage = language || "en"
    const text = strings[selectedLanguage][tag] || strings["en"][tag] || tag
    return text
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("❌ " + getString("selectFile"));
      return;
    }

    setUploadStatus("⚠️ " + getString("uploadingGenerating"))
    setCurrentState(UPLOADING)

    try {

      const data = new FormData()
      data.append('file', selectedFile)
      data.append('language', `${languageName} ${language}`)

      const sentRequest = await fetch('http://127.0.0.1:8000/document/upload/', {
        method: 'POST',
        body: data
      })

      const response = await sentRequest.json()

      console.log(response)

      setUploadStatus("✅ " + getString("uploadSuccess"));
      setQuestions(response.items)
      setUploadId(response.id)
      setCurrentState(EDIT)
    } catch (error) {
      setUploadStatus("😭 " + getString("uploadFailed"));
      setCurrentState(UPLOAD)
    }
  };

  const handleInput = (index: number, text: string) => {
    setInput({ ...input, [index]: text })

    delete valid[index];
    setValid({ ...valid })

    delete inputTranslations[index];
    setInputTranslations({ ...inputTranslations })
  }

  const handleValidate = async (index: number) => {
    console.log(index)

    const sentRequest = await fetch(`http://127.0.0.1:8000/document/validate/`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        upload_id: uploadId,
        question_id: index,
        user_input: input[index] || "(User has not typed anything)"
      })
    })

    const response = await sentRequest.json()

    if (!response.valid) {
      alert(response.message)
    } else {
      const updatedValid = { ...valid }
      updatedValid[index] = true;
      setValid(updatedValid)
      
      const updatedInputTranslation = { ...inputTranslations }
      updatedInputTranslation[index] = response.translation || input[index];
      setInputTranslations(updatedInputTranslation)
    }

    console.log(response)
  }

  const handleQuestion = async (index: number) => {
    const question = prompt(getString("whatIsQuestion"))

    const sentRequest = await fetch(`http://127.0.0.1:8000/document/ask/`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        upload_id: uploadId,
        question_id: index,
        user_input: input[index] || "(User has not typed anything)",
        question
      })
    })
    const response = await sentRequest.json()

    alert(response.response)
  }

  const validateAll = () => {
    const inputs = []

    let reject = false;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].type == "question" && !valid[i]) {
        reject = true;
        break;
      }

      if(questions[i].type == "question") {
        inputs.push({
          id: i,
          text: inputTranslations[i]
        })
      }
    }

    if (reject) {
      alert(getString("notAllValid"))
      return;
    }

    console.log(inputs)
  }

  return (
    <div>
      {currentState == LANGUAGE && <div>
        {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold">AI Immigration Consultant & Refugee Checker</h1>
          <nav>
            <ul className="flex space-x-6">
            <li>
                <a href="/" className="text-xl hover:text-blue-500 transition">Home</a>
              </li>
              <li>
                <a href="/document" className="text-xl hover:text-blue-500 transition">Document Help</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Your existing theme toggle button (commented out) remains here */}
      </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="grid grid-cols-6 gap-4">
          {languages.map((item) => (
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => { setLanguage(item.code); setCurrentState(UPLOAD); setLanguageName(item.name) }}>{item.name}</button>
          ))}</div>
        </div>
      </div>}

      {(currentState == UPLOAD || currentState == UPLOADING) && <div>
          {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold">AI Immigration Consultant & Refugee Checker</h1>
          <nav>
            <ul className="flex space-x-6">
            <li>
                <a href="/" className="text-xl hover:text-blue-500 transition">Home</a>
              </li>
              <li>
                <a href="/document" className="text-xl hover:text-blue-500 transition">Document Help</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Your existing theme toggle button (commented out) remains here */}
      </div>
        <div className="flex justify-center items-center min-h-screen">

          <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">📂 {getString("uploadGovernmentForms")}</h2>

            {currentState == UPLOAD && <label
              className="w-full p-6 text-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:border-blue-500"
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile ? <p>{selectedFile.name}</p> : <p>{getString("dragDrop")}</p>}
            </label>}

            {currentState == UPLOAD && <button
              onClick={handleUpload}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {getString("upload")}
            </button>}

            {uploadStatus && (
              <p className="mt-4 text-lg font-semibold text-center">{uploadStatus}</p>
            )}
          </div>
        </div></div>}{

        currentState == EDIT && <div>
          <div className="min-h-screen transition duration-500 p-10 bg-white text-black dark:bg-gray-900 dark:text-white">

            <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
              <h1 className="text-3xl font-bold">{getString("completeDocument")}</h1>
                {/* Header */}
                <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="text-xl hover:text-blue-500 transition">Home</a>
              </li>
              <li>
                <a href="/document" className="text-xl hover:text-blue-500 transition">Document Help</a>
              </li>
              {/* <li>
                <a href="/resources" className="text-xl hover:text-blue-500 transition">Resources</a>
              </li>
              <li>
                <a href="/contact" className="text-xl hover:text-blue-500 transition">Contact</a>
              </li> */}
            </ul>
          </nav>
            </div>

            {questions.map((item: any, index) => (<div key={index}>
              {item.type == "break" && <div>
                <div className="mt-16 p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <p className="">{item.description}</p>
                </div>
              </div>}

              {item.type == "question" && <div>
                <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <p className="">{item.description}</p>

                  {!!item.options && item.options.length > 1 && <p>{getString("possibleOptions")}: {item.options.join(', ')}</p>}

                  <input onChange={(data) => {
                    handleInput(index, data.target.value)
                  }} className="border-2 border-dashed border-gray-400 rounded-lg bg-white dark:bg-gray-700 hover:border-blue-500 w-full"></input>
                  {!valid[index] ?
                    <button
                      onClick={() => { handleValidate(index) }}
                      className="mt-4 mr-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                      {getString("validate")}
                    </button>
                    :
                    <p>{getString("validHappy")}</p>
                  }
                  <button
                    onClick={() => { handleQuestion(index) }}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    {getString("askQuestions")}
                  </button>
                </div>
              </div>}
            </div>))}

            <button
              onClick={() => { validateAll() }}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {getString("submit")}
            </button>
          </div>
        </div>}
    </div>
  );
};

export default UploadBox;