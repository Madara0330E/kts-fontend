<script>
  import Cards from '$lib/components/Cards.svelte';
  import AddCard from '$lib/components/AddCard.svelte';
  import magnifiersImg from '$lib/assets/images/components/magnifier.svg';
  import leftArrowImg from '$lib/assets/images/components/rightPanel/leftArrow.png';
  import rightArrowImg from '$lib/assets/images/components/rightPanel/rightArrow.png';
  import filterParametersImg from '$lib/assets/images/components/filterParameters.svg';
  import sortingOptionsImg from '$lib/assets/images/components/sortingOptions.svg';
</script>

<div>
  <div class="w-full h-full max-w-full max-h-full flex flex-col gap-[14px] bg-[#212121]/60 pl-[8px] pr-[8px] rounded-[20px] pt-[8px] pb-[8px]">
    <div class="w-full h-full max-w-full max-h-full flex justify-center items-center bg-[#212121] pl-[8px] pr-[8px] pt-[4px] pb-[4px] gap-[4px] rounded-[20px] ">
     <div class="flex items-center justify-center rounded-[12px] bg-[#2C2C2C] w-[45px] h-[45px]">  <img src={leftArrowImg} alt="leftArrow" class="" /></div>
     <div class="flex items-center justify-center rounded-[12px] bg-[#2C2C2C] w-[45px] h-[45px]">  <img src={rightArrowImg} alt="rightArrow" class="" /></div>
    <div class="pt-[14.5px] pb-[14.5px] pl-[18px] pr-[18px] flex items-center w-[1020px] h-[45px] px-[8px] gap-[8px] rounded-[12px] border bg-[#F8F8F8]/5 focus:outline-none focus:ring-0 border-none placeholder:font-tiktok placeholder:text-[16px] ">
      
      <img src={magnifiersImg} alt="magnifier" class="w-[16px] h-[16px]" />
      
      
      <input 
        type="text" 
        placeholder="Введите поисковой запрос" 
        class="w-full h-full bg-transparent text-[#F8F8F8]/30 text-[16px] font-medium font-tiktok focus:outline-none focus:ring-0 border-none placeholder:font-tiktok placeholder:text-[16px]"
      />
    </div>
    <div class="flex items-center justify-center rounded-[12px] bg-[#2C2C2C] w-[45px] h-[45px]">  <img src={filterParametersImg} alt="filterParameters" class="" /></div>
    <div class="flex items-center justify-center rounded-[12px] bg-[#2C2C2C] w-[45px] h-[45px]">  <img src={sortingOptionsImg} alt="sortingOptions" class="" /></div>
    </div>

    <div class="flex gap-[10px]">
      <Cards />
      <AddCard />
    </div>

  </div>
</div>