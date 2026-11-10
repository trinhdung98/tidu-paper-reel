# Nghiên cứu thiết kế bảy narrative video formats

Ngày đối chiếu nguồn: 2026-11-10. Phạm vi: video giáo dục tiếng Việt 9:16 trong renderer Canvas của repo, không phải trình học tương tác. Tài liệu này phân biệt **bằng chứng**, **suy luận ứng dụng** và **quy ước biên tập**. Cách dùng CLI và schema: [video-formats.md](video-formats.md).

## Kết luận kiến trúc

Format là hợp đồng về mục tiêu học, chuỗi lập luận, thứ tự tiết lộ, thời gian xử lý, không gian hình ảnh và cách kết thúc; không phải bảy màu của cùng một slideshow. Tách ba lớp:

1. `formats/Fxx.json`: hợp đồng, mục tiêu, câu hỏi review, nguồn và ví dụ hoàn chỉnh.
2. `narrative.json` trong piece: năm beat với lời thoại và dữ liệu hình ảnh; `voice/script.json` là bản lời đọc phẳng để dùng pipeline TTS hiện tại. Chỉnh cả hai đồng bộ; validator báo lệch.
3. `templates/formats/src/scenes.js`: bảy ngữ pháp hình ảnh, chạy bằng thời gian `VOICE` thật. Các câu trong cùng một beat không tự động phá bố cục; nhấn mạnh thay đổi theo lời đọc. Cảnh chuyển ở ranh giới ý nghĩa.

Không đổi `piece.json.format` (đang là kích thước/fps); format kể chuyện dùng `narrativeFormat`. Không sửa piece cũ hoặc biến tất cả nội dung thành quiz. Preview có timing ước lượng riêng, không ghi đè timing thật và không đủ điều kiện xuất bản.

## Bằng chứng chung và giới hạn ngoại suy

**Brame (2016)** tổng hợp ba nhóm thiết kế video học tập: tải nhận thức, engagement và active learning. Signaling, segmenting, weeding và phối hợp lời–hình là hướng dẫn phù hợp. Tài liệu bàn nhiều về đại học/MOOC, không xác lập một công thức viral cho Shorts. Các kết quả về video dưới sáu phút không thể suy ra rằng một clip 30 giây tốt hơn 60 giây.

**Áp dụng:** một mục tiêu học/video; một thay đổi chính mỗi nhịp; nhãn gần vật được nói tới; bỏ chuyển động nền không liên quan. Giữ giấy cắt, font Việt và mascot của Tidu, nhưng không bắt mọi câu đổi mũ, đổi tường hay thêm ba món trang trí. Caption phục vụ khả năng tiếp cận; hero là đồ vật/sơ đồ, không chép cả lời đọc lên một thẻ nữa. Có thể giảm/tắt nhạc khi nội dung khó; nghiên cứu không chứng minh nhạc lo-fi luôn giúp học.

**Quy ước sản phẩm, không phải kết quả nghiên cứu:** 1080×1920, 30 fps; các khoảng giây bên dưới lấy từ ảnh yêu cầu; preview dùng 4 token cách-trắng/giây, không phải tốc độ nói chuẩn hóa cho mọi ngôn ngữ. Thời lượng phải đo lại sau TTS. Không thêm khoảng im lặng để chữa một bài thiếu nội dung.

## F01 — Question → Answer · 25–60 giây

**Công việc nhận thức:** hướng sự chú ý vào một câu hỏi cụ thể và thay một mô hình sai bằng giải thích đúng.

**Bằng chứng:** St Hilaire, Chan & Ahn (online 2023; tập báo 2024) tổng hợp hiệu ứng prequestion: lợi ích đáng kể cho nội dung đã hỏi, gần như không có hiệu ứng chung cho nội dung không được hỏi. Schroeder & Kucera (2022) tổng hợp refutation text: nêu misconception, bác bỏ rõ và đưa ra giải thích thay thế; không chỉ đưa đáp án đúng.

**Hợp đồng:** Hook Question → Misconception → Explanation → Reveal → Takeaway. Câu hỏi có thể kiểm chứng; hiểu lầm phải hợp lý và được gắn nhãn là hiểu lầm. Explanation mô tả phép biến đổi/cơ chế; reveal trả lời đúng câu hỏi ban đầu; takeaway là nguyên tắc có thể áp dụng lại.

**Bố cục/chuyển động:** câu hỏi ở vị trí ổn định; vật đếm/annotation biến đổi tại từ khóa; hiểu lầm không có dấu xác nhận; sơ đồ đúng thay thế mô hình sai. Không giấu thông tin cần để hiểu chỉ nhằm tạo bất ngờ. Kết thúc bằng nguyên tắc, không bắt buộc comment CTA.

**Review:** câu hỏi và đáp án có cùng phạm vi không? Hiểu lầm đã được sửa bằng nguyên nhân hay chỉ bị đánh dấu sai? Người xem có áp dụng được với số/ví dụ khác không?

**Giới hạn:** nghiên cứu prequestion/refutation chủ yếu ở môi trường học tập, không đo retention của reel tiếng Việt; không được hứa tăng lượt xem hay phần trăm học tập từ việc chọn F01.

## F02 — Character Story · 40–90 giây

**Công việc nhận thức:** hiểu một quyết định qua mục tiêu, hành động và hệ quả.

**Bằng chứng:** Dahlstrom (2014) tổng quan khả năng tăng hiểu/quan tâm và sức thuyết phục của narrative, cùng rủi ro đạo đức. Một tình huống cá nhân dễ nhớ không tự nó chứng minh một quy luật.

**Hợp đồng:** Character → Problem → Attempts → Consequence → Lesson. Một nhân vật có mục tiêu rõ; vấn đề cản mục tiêu; hành động dẫn tới hệ quả quan sát được; lesson chỉ khái quát trong điều kiện phù hợp. Truyện hư cấu phải ghi là minh họa, không giả làm nghiên cứu/case thật.

**Bố cục/chuyển động:** cùng một mascot làm nhân vật, không thay danh tính giữa beat; đạo cụ tài nguyên/mục tiêu thay đổi theo quyết định; thoại ngắn và cảm xúc phục vụ hành động. Đường hành trình nối các beat; không thêm drama ngoài mục tiêu học. Kết thúc bằng một hành động có thể thử, không hứa làm giàu/chữa bệnh.

**Review:** có thể giải thích vì sao hành động gây hệ quả không? Nếu bỏ gương mặt và thoại, còn hành động thực không? Có nhầm anecdote với bằng chứng không?

**Giới hạn:** nguồn là tổng quan science communication, không chứng minh mascot động vật luôn hiệu quả hơn người hay mọi câu chuyện đều giúp ghi nhớ tốt hơn.

## F03 — A vs B · 30–60 giây

**Công việc nhận thức:** so sánh theo cùng tiêu chí và chọn theo điều kiện.

**Bằng chứng:** Schwartz & Bransford (1998), ba nghiên cứu lớp học, cho thấy phân tích contrasting cases trước giải thích có thể chuẩn bị cho hiểu và transfer tốt hơn các đối chứng của họ. Không phải bằng chứng rằng chỉ đặt hai ô cạnh nhau đã tạo học tập.

**Hợp đồng:** Two Options → Criteria → Comparison → Conditions → Conclusion. Hai lựa chọn giữ nguyên danh tính; mỗi hàng là cùng một tiêu chí/đơn vị ở hai bên; kết luận có điều kiện, không tuyên bố thắng tuyệt đối khi dữ liệu không hỗ trợ.

**Bố cục/chuyển động:** A trái, B phải suốt video; cùng kích thước, cùng baseline; nhấn từng hàng thay vì bật mọi tiêu chí đồng thời. Màu hỗ trợ phân biệt nhưng tên và nhãn vẫn rõ khi không phân biệt màu. Kết thúc bằng quy tắc “khi… chọn…”, giữ cả hai phương án để đối chiếu.

**Review:** có apples-to-oranges, đổi đơn vị, đổi tiêu chí hoặc di chuyển A/B không? Có nêu đánh đổi và trường hợp lựa chọn còn lại hữu ích không?

**Giới hạn:** bài gốc dùng bài học dài và hoạt động phân tích chủ động; dùng vào clip tuyến tính là suy luận thiết kế, không tái tạo đầy đủ can thiệp gốc.

## F04 — How It Works · 45–90 giây

**Công việc nhận thức:** xây mô hình nhân–quả của một hệ thống, không chỉ nhớ tên linh kiện.

**Bằng chứng:** Brame (2016) về signaling/segmenting và Tversky, Morrison & Bétrancourt (2002) về congruence/apprehension: hình phải tương ứng cấu trúc kiến thức và đủ dễ nhìn; animation không mặc nhiên tốt hơn sơ đồ tĩnh tương đương.

**Hợp đồng:** System → Components → Process → Mechanism → Result. System xác định input/output và ranh giới. Components chỉ các bộ phận cần thiết. Process chỉ thứ tự; mechanism giải thích vì sao bước đó làm kết quả đổi; result ghép lại toàn hệ thống và nhắc điều kiện hoạt động.

**Bố cục/chuyển động:** tách lớp có kiểm soát; giữ nhãn gắn với phần tương ứng; mũi tên có hướng chỉ luồng/quan hệ, không tự được coi là giải thích cơ chế. Mỗi lượt chỉ một lớp/luồng nổi bật; giữ dấu vết các bước trước. Kết thúc bằng hệ thống hoàn chỉnh.

**Review:** sau video người xem trả lời được “nếu bỏ một phần thì sao?” hay chỉ đọc lại danh sách? Sơ đồ có nhầm thứ tự thời gian với quan hệ nhân quả không?

**Giới hạn:** renderer cung cấp sơ đồ cấu trúc/luồng, không phải mô phỏng vật lý đã được kiểm định. Hình specialized cho từng chủ đề vẫn phải do tác giả vẽ và review.

## F05 — Interactive Quiz · 15–45 giây

**Công việc nhận thức:** tự tạo/chọn đáp án trước feedback, rồi hiểu lý do.

**Bằng chứng:** Szpunar, Khan & Schacter (2013) cho thấy interpolated memory tests giảm mind wandering và hỗ trợ học trong hai thí nghiệm với bài giảng thống kê 21 phút. Brame (2016) khuyến nghị câu hỏi và feedback. Thí nghiệm này không kiểm định countdown ba giây trong Shorts.

**Hợp đồng:** Challenge → Options → Thinking Pause → Answer → Explanation. Một câu hỏi, các lựa chọn ổn định và một đáp án đúng không mơ hồ; pause bắt đầu sau câu mời suy nghĩ. Không đổi choices/correct giữa beat. Answer chỉ highlight sau khi đủ pause; explanation nêu lý do và cách tránh nhầm.

**Bố cục/chuyển động:** lưới lựa chọn giữ nguyên vị trí; trước answer mọi lựa chọn có độ nhấn như nhau; countdown không kèm gợi ý đúng sai. Sau reveal mới giảm alpha phương án khác. Caption của câu sau không được xuất hiện sớm trong pause. Nhạc/cue không “báo đúng” trước reveal.

**Quy ước:** 3–5 giây là điểm khởi đầu biên tập, điều chỉnh theo độ khó và đối tượng; có thể mời bấm dừng. `after` phải đủ countdown cộng khoảng lead-cut 0,1 giây. Validator dùng cả thời gian audio thực, không chỉ đếm giây khai báo.

**Giới hạn quan trọng:** MP4 là **quiz tuyến tính có lời mời tham gia**, không nhận click, chấm điểm hay lưu đáp án. Không hiển thị điểm/thống kê người dùng giả; muốn tương tác thật cần một sản phẩm player riêng, ngoài phạm vi này.

## F06 — Transformation · 25–60 giây

**Công việc nhận thức:** theo dõi một đối tượng thay đổi qua các trạng thái và hiểu tác nhân/điều kiện.

**Bằng chứng:** Tversky và cộng sự (2002) chỉ rõ lợi ích của trạng thái trung gian và hạn chế của thông tin thoáng qua; animation giàu hiệu ứng nhưng khó theo dõi có thể không tốt hơn hình tĩnh tương đương.

**Hợp đồng:** Initial State → Trigger → Change → Result → Implication. Cùng một đối tượng; baseline giữ lại; trigger được nêu rõ; change có bước trung gian; result so với baseline; implication nêu phạm vi, không suy ra nhân quả chỉ vì trước–sau khác nhau.

**Bố cục/chuyển động:** một hero morph/growth có trục và vị trí ổn định; silhouette mờ của baseline để đối chiếu; timeline định tính. Thanh tiến trình là mức chuyển cảnh minh họa, không tự biến thành phần trăm đo lường. Nếu có growth chart định lượng phải có số liệu, đơn vị và nguồn; không tự tạo đường tăng để minh họa lời hứa.

**Review:** điều gì được giữ nguyên? Hình có bỏ qua bước quan trọng không? Có implied guarantee về sức khỏe/tài chính/thói quen không? Kết thúc cho thấy cả kết quả lẫn điều kiện duy trì.

**Giới hạn:** không có bằng chứng từ nguồn này rằng video morph luôn tốt hơn before/after tĩnh. Chọn chuyển động vì nó làm rõ thay đổi cụ thể.

## F07 — What If? · 40–90 giây

**Công việc nhận thức:** suy luận trong mô hình giả định mà không nhầm nó với sự thật/dự báo.

**Bằng chứng:** Rafetseder, Cristi-Vargas & Perner (2010) phân biệt suy luận điều kiện với counterfactual bị ràng buộc bởi sự kiện thực; giữ hai mô hình là một yêu cầu nhận thức đáng kể. Nghiên cứu phát triển ở trẻ em, không phải thử nghiệm hiệu quả của format video.

**Hợp đồng:** Hypothesis → Assumptions → Consequences → Reality Check → Takeaway. Đổi một điều kiện rõ, công khai các yếu tố giữ nguyên. Chuỗi hệ quả có lý do và giới hạn. Reality check quay về thế giới thực, nhắc giả định nào không xảy ra/đã đơn giản hóa. Takeaway là bài học về mô hình, không biến giả định thành sự kiện.

**Bố cục/chuyển động:** hai nhánh “thực tế/giả định” cùng mốc; nhãn GIẢ ĐỊNH tồn tại trong phần suy diễn; chỉ animate biến đã đổi; hệ quả theo thứ tự. Reality check phục hồi nhãn/thế giới thật một cách rõ ràng, không chỉ thay màu. Không gán xác suất hoặc con số cho hệ quả nếu chưa có mô hình/nguồn.

**Review:** có vô tình thay nhiều biến? Các hệ quả có thật sự suy ra từ giả định không? Có phân biệt chắc chắn/có thể/chưa biết không? Với người xem nhỏ tuổi, có cần giản lược độ dài chuỗi suy luận không?

**Giới hạn:** hỗ trợ kỷ luật lập luận, không chứng minh cliffhanger hay “what if” làm tăng watch time. Chuyển động trong repo là minh họa mô hình, không phải một scientific simulator.

## Kiểm tra máy và review con người

**Máy có thể kiểm tra:** format ID; đủ năm beat đúng thứ tự; ID lời đọc duy nhất; script khớp narrative; dữ liệu visual đúng kiểu; timing hợp lệ và trong khoảng hợp đồng; danh tính A/B; choices/answer nhất quán; pause thật trước answer; từ chối timing preview khi xuất bản; text layout và tính deterministic bằng renderer hiện có.

**Con người vẫn phải kiểm tra:** tính đúng của kiến thức; nguồn cho claim; quan hệ nhân–quả; mức khó; sự phù hợp của ẩn dụ; hình có thật sự giải thích lời; âm thanh; khả năng đọc trên điện thoại; không lộ đáp án qua lời/đồ họa/caption. Validator không thể chứng minh lesson đúng hoặc thay một review học thuật.

## Nguồn đối chiếu

1. Brame, C. J. (2016). *Effective Educational Videos: Principles and Guidelines for Maximizing Student Learning from Video Content*. CBE—Life Sciences Education 15(4), es6. [Toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC5132380/), DOI 10.1187/cbe.16-03-0125. Dùng cho nguyên tắc chung/F04/F05; bài tổng hợp.
2. St Hilaire, K. J., Chan, J. C. K., & Ahn, D. (2024; online 2023). *Guessing as a learning intervention: A meta-analytic review of the prequestion effect*. Psychonomic Bulletin & Review 31, 411–441. [Abstract chính thức](https://pubmed.ncbi.nlm.nih.gov/37640836/), DOI 10.3758/s13423-023-02353-8. Dùng cho F01; không suy rộng lợi ích sang mọi nội dung.
3. Schroeder, N. L., & Kucera, A. C. (2022). *Refutation Text Facilitates Learning: a Meta-Analysis of Between-Subjects Experiments*. Educational Psychology Review 34, 957–987. [Toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC8784251/), DOI 10.1007/s10648-021-09656-z. Dùng cho F01; bằng chứng refutation text, không trực tiếp bảy format reel.
4. Dahlstrom, M. F. (2014). *Using narratives and storytelling to communicate science with nonexpert audiences*. PNAS 111(Suppl 4), 13614–13620. [Abstract chính thức](https://pubmed.ncbi.nlm.nih.gov/25225368/), [toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC4183170/), DOI 10.1073/pnas.1320645111. Dùng cho F02; tổng quan và đạo đức narrative.
5. Schwartz, D. L., & Bransford, J. D. (1998). *A Time for Telling*. Cognition and Instruction 16(4), 475–522. [Bản tác giả](https://aaalab.stanford.edu/papers/time_for_telling.pdf), [bản đầy đủ đối chiếu](https://www.wright.edu/sites/www.wright.edu/files/uploads/2017/Feb/event/Schwartz_Bransford_1998_TimeForTelling.pdf), DOI 10.1207/s1532690xci1604_4. Dùng cho F03; ba nghiên cứu lớp học.
6. Szpunar, K. K., Khan, N. Y., & Schacter, D. L. (2013). *Interpolated memory tests reduce mind wandering and improve learning of online lectures*. PNAS 110(16), 6313–6317. [Toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC3631699/), DOI 10.1073/pnas.1221764110. Dùng cho F05; hai thí nghiệm, bài giảng 21 phút.
7. Tversky, B., Morrison, J. B., & Bétrancourt, M. (2002). *Animation: can it facilitate?* International Journal of Human–Computer Studies 57, 247–262. [PDF trường đại học](https://www.tc.columbia.edu/faculty/bt2158/faculty-profile/files/_Morrison_Betrancourt_AnimationCanitfacilitate.pdf), DOI 10.1006/ijhc.2002.1017. Dùng cho F04/F06; tổng quan phê bình và nguyên tắc đồ họa.
8. Rafetseder, E., Cristi-Vargas, R., & Perner, J. (2010). *Counterfactual Reasoning: Developing a sense of “nearest possible world”*. Child Development 81(1), 376–389. [Toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC3201838/), DOI 10.1111/j.1467-8624.2009.01401.x. Dùng cho F07; nghiên cứu trẻ em, không kiểm nghiệm reel.

Nguồn web search được đối chiếu với nội dung gốc/abstract chính thức. Một số trang PMC trả challenge cho trình trích xuất; dùng bản HTML/abstract chính thức thay vì suy diễn từ trang trống. Không dùng nội dung của bài PMC4183176 (bài khác về khoa học/chính trị) làm bằng chứng cho narrative.
