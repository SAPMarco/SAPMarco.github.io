/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/DataType","sap/ui/base/EventProvider","sap/ui/core/Control","sap/base/util/ObjectPath","sap/ui/core/library","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/assert","sap/base/Log","sap/base/util/defineLazyProperty","sap/base/security/encodeCSS","./AvatarShape","./AvatarSize","./AvatarType","./AvatarColor","./AvatarImageFitType","./Support"],function(e,a,t,n,i,r,o,s,l,p,m,u,c,d,g,f,S){"use strict";sap.ui.getCore().initLibrary({name:"sap.m",version:"1.82.0",dependencies:["sap.ui.core"],designtime:"sap/m/designtime/library.designtime",types:["sap.m.AvatarImageFitType","sap.m.AvatarShape","sap.m.AvatarSize","sap.m.AvatarType","sap.m.AvatarColor","sap.m.BackgroundDesign","sap.m.BadgeState","sap.m.BarDesign","sap.m.BreadcrumbsSeparatorStyle","sap.m.ButtonType","sap.m.CarouselArrowsPlacement","sap.m.DateTimeInputType","sap.m.DeviationIndicator","sap.m.DialogRoleType","sap.m.DialogType","sap.m.DraftIndicatorState","sap.m.FacetFilterListDataType","sap.m.FacetFilterType","sap.m.FlexAlignContent","sap.m.FlexAlignItems","sap.m.FlexAlignSelf","sap.m.FlexDirection","sap.m.FlexJustifyContent","sap.m.FlexRendertype","sap.m.FlexWrap","sap.m.FrameType","sap.m.GenericTagDesign","sap.m.GenericTagValueState","sap.m.GenericTileMode","sap.m.GenericTileScope","sap.m.HeaderLevel","sap.m.IBarHTMLTag","sap.m.IconTabDensityMode","sap.m.IconTabFilterDesign","sap.m.IconTabHeaderMode","sap.m.ImageMode","sap.m.InputTextFormatMode","sap.m.InputType","sap.m.LabelDesign","sap.m.LightBoxLoadingStates","sap.m.LinkConversion","sap.m.ListGrowingDirection","sap.m.ListHeaderDesign","sap.m.ListKeyboardMode","sap.m.ListMode","sap.m.ListSeparators","sap.m.ListType","sap.m.LoadState","sap.m.MenuButtonMode","sap.m.ObjectHeaderPictureShape","sap.m.ObjectMarkerType","sap.m.ObjectMarkerVisibility","sap.m.OverflowToolbarPriority","sap.m.P13nPanelType","sap.m.P13nConditionOperation","sap.m.PageBackgroundDesign","sap.m.PanelAccessibleRole","sap.m.PDFViewerDisplayType","sap.m.PlacementType","sap.m.PlanningCalendarBuiltInView","sap.m.PlanningCalendarStickyMode","sap.m.PopinDisplay","sap.m.PopinLayout","sap.m.QuickViewGroupElementType","sap.m.RatingIndicatorVisualMode","sap.m.ScreenSize","sap.m.SelectionDetailsActionLevel","sap.m.SelectListKeyboardNavigationMode","sap.m.SelectType","sap.m.Size","sap.m.SplitAppMode","sap.m.StandardTileType","sap.m.StepInputStepModeType","sap.m.StepInputValidationMode","sap.m.Sticky","sap.m.StringFilterOperator","sap.m.SwipeDirection","sap.m.SwitchType","sap.m.TileSizeBehavior","sap.m.TimePickerMaskMode","sap.m.TitleAlignment","sap.m.TokenizerRenderMode","sap.m.ToolbarDesign","sap.m.ToolbarStyle","sap.m.UploadState","sap.m.ValueColor","sap.m.ValueCSSColor","sap.m.VerticalPlacementType","sap.m.WrappingType","sap.m.semantic.SemanticRuleSetType"],interfaces:["sap.m.IBar","sap.m.IBadge","sap.m.IBreadcrumbs","sap.m.IconTab","sap.m.IScale","sap.m.semantic.IGroup","sap.m.semantic.IFilter","sap.m.semantic.ISort","sap.m.ObjectHeaderContainer","sap.m.IOverflowToolbarContent","sap.m.IOverflowToolbarFlexibleContent","sap.m.IHyphenation"],controls:["sap.m.ActionListItem","sap.m.ActionSelect","sap.m.ActionSheet","sap.m.App","sap.m.Avatar","sap.m.Bar","sap.m.BusyDialog","sap.m.BusyIndicator","sap.m.Button","sap.m.Breadcrumbs","sap.m.Carousel","sap.m.CheckBox","sap.m.ColumnHeaderPopover","sap.m.ColumnListItem","sap.m.ColorPalette","sap.m.ColorPalettePopover","sap.m.ComboBox","sap.m.ComboBoxTextField","sap.m.ComboBoxBase","sap.m.CustomListItem","sap.m.CustomTile","sap.m.CustomTreeItem","sap.m.DatePicker","sap.m.DateRangeSelection","sap.m.DateTimeField","sap.m.DateTimeInput","sap.m.DateTimePicker","sap.m.Dialog","sap.m.DisplayListItem","sap.m.DraftIndicator","sap.m.FacetFilter","sap.m.FacetFilterItem","sap.m.FacetFilterList","sap.m.FeedContent","sap.m.FeedInput","sap.m.FeedListItem","sap.m.FlexBox","sap.m.FormattedText","sap.m.GenericTag","sap.m.GenericTile","sap.m.GroupHeaderListItem","sap.m.GrowingList","sap.m.HBox","sap.m.HeaderContainer","sap.m.IconTabBar","sap.m.IconTabBarSelectList","sap.m.IconTabHeader","sap.m.Image","sap.m.ImageContent","sap.m.Input","sap.m.InputBase","sap.m.InputListItem","sap.m.Label","sap.m.LightBox","sap.m.Link","sap.m.List","sap.m.ListBase","sap.m.ListItemBase","sap.m.MaskInput","sap.m.Menu","sap.m.MenuButton","sap.m.MessagePage","sap.m.MessagePopover","sap.m.MessageView","sap.m.MessageStrip","sap.m.MultiComboBox","sap.m.MultiEditField","sap.m.MultiInput","sap.m.NavContainer","sap.m.NewsContent","sap.m.NumericContent","sap.m.NotificationListBase","sap.m.NotificationListItem","sap.m.NotificationListGroup","sap.m.PagingButton","sap.m.PlanningCalendarLegend","sap.m.ObjectAttribute","sap.m.ObjectHeader","sap.m.ObjectIdentifier","sap.m.ObjectListItem","sap.m.ObjectMarker","sap.m.ObjectNumber","sap.m.ObjectStatus","sap.m.OverflowToolbar","sap.m.OverflowToolbarButton","sap.m.OverflowToolbarToggleButton","sap.m.P13nColumnsPanel","sap.m.P13nGroupPanel","sap.m.P13nSelectionPanel","sap.m.P13nDimMeasurePanel","sap.m.P13nConditionPanel","sap.m.P13nDialog","sap.m.P13nFilterPanel","sap.m.P13nPanel","sap.m.P13nSortPanel","sap.m.Page","sap.m.Panel","sap.m.PDFViewer","sap.m.PlanningCalendar","sap.m.PlanningCalendarHeader","sap.m.Popover","sap.m.ProgressIndicator","sap.m.PullToRefresh","sap.m.QuickView","sap.m.QuickViewBase","sap.m.QuickViewCard","sap.m.QuickViewPage","sap.m.RadioButton","sap.m.RadioButtonGroup","sap.m.RangeSlider","sap.m.RatingIndicator","sap.m.ResponsivePopover","sap.m.ScrollContainer","sap.m.SearchField","sap.m.SegmentedButton","sap.m.Select","sap.m.SelectDialog","sap.m.SelectList","sap.m.SelectionDetails","sap.m.Shell","sap.m.SimpleFixFlex","sap.m.SinglePlanningCalendar","sap.m.SinglePlanningCalendarGrid","sap.m.SinglePlanningCalendarMonthGrid","sap.m.Slider","sap.m.SliderTooltip","sap.m.SliderTooltipBase","sap.m.SliderTooltipContainer","sap.m.SlideTile","sap.m.StepInput","sap.m.SplitApp","sap.m.SplitContainer","sap.m.StandardListItem","sap.m.StandardTreeItem","sap.m.StandardTile","sap.m.Switch","sap.m.Table","sap.m.TableSelectDialog","sap.m.TabContainer","sap.m.TabStrip","sap.m.Text","sap.m.TextArea","sap.m.Tile","sap.m.TileContainer","sap.m.TileContent","sap.m.TimePicker","sap.m.TimePickerSliders","sap.m.Title","sap.m.ToggleButton","sap.m.Token","sap.m.Tokenizer","sap.m.Toolbar","sap.m.ToolbarSpacer","sap.m.ToolbarSeparator","sap.m.Tree","sap.m.TreeItemBase","sap.m.UploadCollection","sap.m.UploadCollectionToolbarPlaceholder","sap.m.upload.UploadSet","sap.m.VBox","sap.m.ViewSettingsDialog","sap.m.WheelSlider","sap.m.WheelSliderContainer","sap.m.Wizard","sap.m.WizardStep","sap.m.semantic.DetailPage","sap.m.semantic.SemanticPage","sap.m.semantic.ShareMenuPage","sap.m.semantic.FullscreenPage","sap.m.semantic.MasterPage"],elements:["sap.m.BadgeCustomData","sap.m.Column","sap.m.ColumnPopoverActionItem","sap.m.ColumnPopoverCustomItem","sap.m.ColumnPopoverItem","sap.m.ColumnPopoverSortItem","sap.m.FlexItemData","sap.m.FeedListItemAction","sap.m.IconTabFilter","sap.m.IconTabSeparator","sap.m.LightBoxItem","sap.m.OverflowToolbarLayoutData","sap.m.MaskInputRule","sap.m.MenuItem","sap.m.MessageItem","sap.m.MessagePopoverItem","sap.m.PageAccessibleLandmarkInfo","sap.m.P13nFilterItem","sap.m.P13nItem","sap.m.PlanningCalendarRow","sap.m.PlanningCalendarView","sap.m.P13nColumnsItem","sap.m.P13nDimMeasureItem","sap.m.P13nGroupItem","sap.m.P13nSortItem","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.ResponsiveScale","sap.m.SegmentedButtonItem","sap.m.SelectionDetailsItem","sap.m.SelectionDetailsItemLine","sap.m.SinglePlanningCalendarDayView","sap.m.SinglePlanningCalendarMonthView","sap.m.SinglePlanningCalendarWeekView","sap.m.SinglePlanningCalendarWorkWeekView","sap.m.SinglePlanningCalendarView","sap.m.SuggestionItem","sap.m.TabContainerItem","sap.m.TabStripItem","sap.m.ToolbarLayoutData","sap.m.UploadCollectionItem","sap.m.UploadCollectionParameter","sap.m.upload.Uploader","sap.m.upload.UploadSetItem","sap.m.ViewSettingsCustomItem","sap.m.ViewSettingsCustomTab","sap.m.ViewSettingsFilterItem","sap.m.ViewSettingsItem","sap.m.plugins.DataStateIndicator","sap.m.plugins.PluginBase","sap.m.semantic.AddAction","sap.m.semantic.CancelAction","sap.m.semantic.DeleteAction","sap.m.semantic.DiscussInJamAction","sap.m.semantic.EditAction","sap.m.semantic.FavoriteAction","sap.m.semantic.FilterAction","sap.m.semantic.FilterSelect","sap.m.semantic.FlagAction","sap.m.semantic.ForwardAction","sap.m.semantic.GroupAction","sap.m.semantic.GroupSelect","sap.m.semantic.MainAction","sap.m.semantic.MessagesIndicator","sap.m.semantic.MultiSelectAction","sap.m.semantic.NegativeAction","sap.m.semantic.OpenInAction","sap.m.semantic.PositiveAction","sap.m.semantic.PrintAction","sap.m.semantic.SaveAction","sap.m.semantic.SemanticButton","sap.m.semantic.SemanticControl","sap.m.semantic.SemanticSelect","sap.m.semantic.SemanticToggleButton","sap.m.semantic.SendEmailAction","sap.m.semantic.SendMessageAction","sap.m.semantic.ShareInJamAction","sap.m.semantic.SortAction","sap.m.semantic.SortSelect"],extensions:{flChangeHandlers:{"sap.m.ActionSheet":{moveControls:"default"},"sap.m.Avatar":"sap/m/flexibility/Avatar","sap.m.Bar":"sap/m/flexibility/Bar","sap.m.Button":"sap/m/flexibility/Button","sap.m.CheckBox":"sap/m/flexibility/CheckBox","sap.m.ColumnListItem":{hideControl:"default",unhideControl:"default"},"sap.m.CustomListItem":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.DatePicker":{hideControl:"default",unhideControl:"default"},"sap.m.Dialog":"sap/m/flexibility/Dialog","sap.m.FlexBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.HBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.IconTabBar":{moveControls:"default"},"sap.m.IconTabFilter":"sap/m/flexibility/IconTabFilter","sap.m.Image":{hideControl:"default",unhideControl:"default"},"sap.m.Input":{hideControl:"default",unhideControl:"default"},"sap.m.InputBase":{hideControl:"default",unhideControl:"default"},"sap.m.InputListItem":"sap/m/flexibility/InputListItem","sap.m.Label":"sap/m/flexibility/Label","sap.m.MultiInput":{hideControl:"default",unhideControl:"default"},"sap.m.ListItemBase":{hideControl:"default",unhideControl:"default"},"sap.m.Link":"sap/m/flexibility/Link","sap.m.List":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.ListBase":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.MaskInput":{hideControl:"default",unhideControl:"default"},"sap.m.MenuButton":"sap/m/flexibility/MenuButton","sap.m.OverflowToolbar":"sap/m/flexibility/OverflowToolbar","sap.m.OverflowToolbarButton":"sap/m/flexibility/OverflowToolbarButton","sap.m.Page":"sap/m/flexibility/Page","sap.m.Panel":"sap/m/flexibility/Panel","sap.m.Popover":"sap/m/flexibility/Popover","sap.m.RadioButton":"sap/m/flexibility/RadioButton","sap.m.RatingIndicator":{hideControl:"default",unhideControl:"default"},"sap.m.RangeSlider":{hideControl:"default",unhideControl:"default"},"sap.m.ScrollContainer":{hideControl:"default",moveControls:"default",unhideControl:"default"},"sap.m.Slider":{hideControl:"default",unhideControl:"default"},"sap.m.StandardListItem":"sap/m/flexibility/StandardListItem","sap.m.Table":"sap/m/flexibility/Table","sap.m.Column":{hideControl:"default",unhideControl:"default"},"sap.m.Text":"sap/m/flexibility/Text","sap.m.Title":"sap/m/flexibility/Title","sap.m.Toolbar":"sap/m/flexibility/Toolbar","sap.m.VBox":{hideControl:"default",unhideControl:"default",moveControls:"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});var T=sap.m;T.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};T.BadgeState={Updated:"Updated",Appear:"Appear",Disappear:"Disappear"};T.BadgeStyle={Default:"Default",Attention:"Attention"};T.BarDesign={Auto:"Auto",Header:"Header",SubHeader:"SubHeader",Footer:"Footer"};T.BreadcrumbsSeparatorStyle={Slash:"Slash",BackSlash:"BackSlash",DoubleSlash:"DoubleSlash",DoubleBackSlash:"DoubleBackSlash",GreaterThan:"GreaterThan",DoubleGreaterThan:"DoubleGreaterThan"};T.ButtonType={Default:"Default",Back:"Back",Accept:"Accept",Reject:"Reject",Transparent:"Transparent",Ghost:"Ghost",Up:"Up",Unstyled:"Unstyled",Emphasized:"Emphasized",Critical:"Critical",Negative:"Negative",Success:"Success",Neutral:"Neutral",Attention:"Attention"};T.ButtonAccessibilityType={Default:"Default",Labelled:"Labelled",Described:"Described",Combined:"Combined"};T.CarouselArrowsPlacement={Content:"Content",PageIndicator:"PageIndicator"};T.PlanningCalendarBuiltInView={Hour:"Hour",Day:"Day",Month:"Month",Week:"Week",OneMonth:"One Month"};T.DateTimeInputType={Date:"Date",DateTime:"DateTime",Time:"Time"};T.DialogType={Standard:"Standard",Message:"Message"};T.DialogRoleType={Dialog:"dialog",AlertDialog:"alertdialog"};T.DeviationIndicator={Up:"Up",Down:"Down",None:"None"};T.DraftIndicatorState={Clear:"Clear",Saving:"Saving",Saved:"Saved"};T.FacetFilterListDataType={Date:"Date",DateTime:"DateTime",Time:"Time",Integer:"Integer",Float:"Float",String:"String",Boolean:"Boolean"};T.FacetFilterType={Simple:"Simple",Light:"Light"};T.FlexAlignItems={Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};T.FlexAlignSelf={Auto:"Auto",Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};T.FlexDirection={Row:"Row",Column:"Column",RowReverse:"RowReverse",ColumnReverse:"ColumnReverse",Inherit:"Inherit"};T.FlexJustifyContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Inherit:"Inherit"};T.FlexWrap={NoWrap:"NoWrap",Wrap:"Wrap",WrapReverse:"WrapReverse"};T.FlexAlignContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Stretch:"Stretch",Inherit:"Inherit"};T.FlexRendertype={Div:"Div",List:"List",Bare:"Bare"};T.FrameType={OneByOne:"OneByOne",TwoByOne:"TwoByOne",TwoThirds:"TwoThirds",Auto:"Auto"};T.LinkConversion={None:"None",ProtocolOnly:"ProtocolOnly",All:"All"};T.InputTextFormatMode={Value:"Value",Key:"Key",ValueKey:"ValueKey",KeyValue:"KeyValue"};T.GenericTagDesign={Full:"Full",StatusIconHidden:"StatusIconHidden"};T.GenericTagValueState={None:"None",Error:"Error"};T.GenericTileMode={ContentMode:"ContentMode",HeaderMode:"HeaderMode",LineMode:"LineMode"};T.GenericTileScope={Display:"Display",Actions:"Actions",ActionMore:"ActionMore",ActionRemove:"ActionRemove"};T.TileSizeBehavior={Responsive:"Responsive",Small:"Small"};T.HeaderLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};T.IBarHTMLTag={Div:"Div",Header:"Header",Footer:"Footer"};T.IconTabHeaderMode={Standard:"Standard",Inline:"Inline"};T.IconTabDensityMode={Inherit:"Inherit",Compact:"Compact",Cozy:"Cozy"};T.IconTabFilterDesign={Horizontal:"Horizontal",Vertical:"Vertical"};T.ImageMode={Image:"Image",Background:"Background"};T.Size={XS:"XS",S:"S",M:"M",L:"L",Auto:"Auto",Responsive:"Responsive"};T.ValueColor={Neutral:"Neutral",Good:"Good",Critical:"Critical",Error:"Error"};T.ValueCSSColor=a.createType("sap.m.ValueCSSColor",{isValid:function(e){var a=T.ValueColor.hasOwnProperty(e);if(a){return a}else{a=r.CSSColor.isValid(e);if(a){return a}else{var t=sap.ui.requireSync("sap/ui/core/theming/Parameters");return r.CSSColor.isValid(t.get(e))}}}},a.getType("string"));T.InputType={Text:"Text",Date:"Date",Datetime:"Datetime",DatetimeLocale:"DatetimeLocale",Email:"Email",Month:"Month",Number:"Number",Tel:"Tel",Time:"Time",Url:"Url",Week:"Week",Password:"Password"};T.LabelDesign={Bold:"Bold",Standard:"Standard"};T.ListHeaderDesign={Standard:"Standard",Plain:"Plain"};T.ListMode={None:"None",SingleSelect:"SingleSelect",SingleSelectLeft:"SingleSelectLeft",SingleSelectMaster:"SingleSelectMaster",MultiSelect:"MultiSelect",Delete:"Delete"};T.ListKeyboardMode={Navigation:"Navigation",Edit:"Edit"};T.ListGrowingDirection={Downwards:"Downwards",Upwards:"Upwards"};T.ListSeparators={All:"All",Inner:"Inner",None:"None"};T.ListType={Inactive:"Inactive",Detail:"Detail",Navigation:"Navigation",Active:"Active",DetailAndActive:"DetailAndActive"};T.SelectListKeyboardNavigationMode={None:"None",Delimited:"Delimited"};T.LoadState={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};T.MenuButtonMode={Regular:"Regular",Split:"Split"};T.OverflowToolbarPriority={NeverOverflow:"NeverOverflow",Never:"Never",High:"High",Low:"Low",Disappear:"Disappear",AlwaysOverflow:"AlwaysOverflow",Always:"Always"};T.ObjectHeaderPictureShape={Circle:"Circle",Square:"Square"};T.P13nPanelType={sort:"sort",filter:"filter",group:"group",columns:"columns",dimeasure:"dimeasure",selection:"selection"};T.P13nConditionOperation={BT:"BT",EQ:"EQ",Contains:"Contains",StartsWith:"StartsWith",EndsWith:"EndsWith",LT:"LT",LE:"LE",GT:"GT",GE:"GE",Initial:"Initial",Empty:"Empty",NotEmpty:"NotEmpty",Ascending:"Ascending",Descending:"Descending",GroupAscending:"GroupAscending",GroupDescending:"GroupDescending",Total:"Total",Average:"Average",Minimum:"Minimum",Maximum:"Maximum"};T.PageBackgroundDesign={Standard:"Standard",List:"List",Solid:"Solid",Transparent:"Transparent"};T.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};T.PDFViewerDisplayType={Auto:"Auto",Embedded:"Embedded",Link:"Link"};T.PlacementType={Left:"Left",Right:"Right",Top:"Top",Bottom:"Bottom",Vertical:"Vertical",VerticalPreferedTop:"VerticalPreferedTop",VerticalPreferredTop:"VerticalPreferredTop",VerticalPreferedBottom:"VerticalPreferedBottom",VerticalPreferredBottom:"VerticalPreferredBottom",Horizontal:"Horizontal",HorizontalPreferedRight:"HorizontalPreferedRight",HorizontalPreferredRight:"HorizontalPreferredRight",HorizontalPreferedLeft:"HorizontalPreferedLeft",HorizontalPreferredLeft:"HorizontalPreferredLeft",PreferredLeftOrFlip:"PreferredLeftOrFlip",PreferredRightOrFlip:"PreferredRightOrFlip",PreferredTopOrFlip:"PreferredTopOrFlip",PreferredBottomOrFlip:"PreferredBottomOrFlip",Auto:"Auto"};T.QuickViewGroupElementType={phone:"phone",mobile:"mobile",email:"email",link:"link",text:"text",pageLink:"pageLink"};T.VerticalPlacementType={Top:"Top",Bottom:"Bottom",Vertical:"Vertical"};T.PopinDisplay={Block:"Block",Inline:"Inline",WithoutHeader:"WithoutHeader"};T.PopinLayout={Block:"Block",GridSmall:"GridSmall",GridLarge:"GridLarge"};T.Sticky={ColumnHeaders:"ColumnHeaders",HeaderToolbar:"HeaderToolbar",InfoToolbar:"InfoToolbar"};T.RatingIndicatorVisualMode={Full:"Full",Half:"Half"};T.ScreenSize={Phone:"Phone",Tablet:"Tablet",Desktop:"Desktop",XXSmall:"XXSmall",XSmall:"XSmall",Small:"Small",Medium:"Medium",Large:"Large",XLarge:"XLarge",XXLarge:"XXLarge"};T.SelectionDetailsActionLevel={Item:"Item",List:"List",Group:"Group"};T.SelectType={Default:"Default",IconOnly:"IconOnly"};T.SplitAppMode={ShowHideMode:"ShowHideMode",StretchCompressMode:"StretchCompressMode",PopoverMode:"PopoverMode",HideMode:"HideMode"};T.StandardTileType={Create:"Create",Monitor:"Monitor",None:"None"};T.semantic=T.semantic||{};T.semantic.SemanticRuleSetType={Classic:"Classic",Optimized:"Optimized"};T.ObjectMarkerType={Flagged:"Flagged",Favorite:"Favorite",Draft:"Draft",Locked:"Locked",Unsaved:"Unsaved",LockedBy:"LockedBy",UnsavedBy:"UnsavedBy"};T.ObjectMarkerVisibility={IconOnly:"IconOnly",TextOnly:"TextOnly",IconAndText:"IconAndText"};T.SwipeDirection={LeftToRight:"LeftToRight",RightToLeft:"RightToLeft",BeginToEnd:"BeginToEnd",EndToBegin:"EndToBegin",Both:"Both"};T.SwitchType={Default:"Default",AcceptReject:"AcceptReject"};T.TokenizerRenderMode={Loose:"Loose",Narrow:"Narrow"};T.ToolbarDesign={Auto:"Auto",Transparent:"Transparent",Info:"Info",Solid:"Solid"};T.ToolbarStyle={Standard:"Standard",Clear:"Clear"};T.TimePickerMaskMode={On:"On",Off:"Off"};T.StringFilterOperator={Equals:"Equals",Contains:"Contains",StartsWith:"StartsWith",AnyWordStartsWith:"AnyWordStartsWith"};T.LightBoxLoadingStates={Loading:"LOADING",Loaded:"LOADED",TimeOutError:"TIME_OUT_ERROR",Error:"ERROR"};T.StepInputValidationMode={FocusOut:"FocusOut",LiveChange:"LiveChange"};T.StepInputStepModeType={AdditionAndSubtraction:"AdditionAndSubtraction",Multiple:"Multiple"};T.UploadState={Complete:"Complete",Error:"Error",Ready:"Ready",Uploading:"Uploading"};T.WrappingType={Normal:"Normal",Hyphenated:"Hyphenated"};T.PlanningCalendarStickyMode={None:"None",All:"All",NavBarAndColHeaders:"NavBarAndColHeaders"};T.TitleAlignment={Auto:"Auto",Start:"Start",Center:"Center"};T.AvatarShape=c;T.AvatarSize=d;T.AvatarType=g;T.AvatarColor=f;T.AvatarImageFitType=S;sap.ui.lazyRequire("sap.m.MessageToast","show");sap.ui.lazyRequire("sap.m.routing.RouteMatchedHandler");sap.ui.lazyRequire("sap.m.routing.Router");sap.ui.lazyRequire("sap.m.routing.Target");sap.ui.lazyRequire("sap.m.routing.TargetHandler");sap.ui.lazyRequire("sap.m.routing.Targets");if(e.os.ios&&e.os.version>=7&&e.os.version<8&&e.browser.name==="sf"){sap.ui.requireSync("sap/m/ios7")}if(/sap-ui-xx-formfactor=compact/.test(location.search)){s("html").addClass("sapUiSizeCompact");T._bSizeCompact=true}if(/sap-ui-xx-formfactor=condensed/.test(location.search)){s("html").addClass("sapUiSizeCondensed");T._bSizeCondensed=true}T.getInvalidDate=function(){return null};T.getLocale=function(){var e=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();T.getLocale=function(){return e};return e};T.getLocaleData=function(){var e=sap.ui.requireSync("sap/ui/core/LocaleData").getInstance(T.getLocale());T.getLocaleData=function(){return e};return e};T.isDate=function(e){return e&&Object.prototype.toString.call(e)=="[object Date]"&&!isNaN(e)};T.getIScroll=function(e){if(typeof window.iScroll!="function"||!(e instanceof n)){return}var a,t;for(a=e;a=a.oParent;){t=a.getScrollDelegate?a.getScrollDelegate()._scroller:null;if(t&&t instanceof window.iScroll){return t}}};T.getScrollDelegate=function(e,a){if(!(e instanceof n)){return}var t=sap.ui.require("sap/ui/core/UIComponent");function i(e){if(!e){return}return a&&t&&e instanceof t?e.oContainer:e.oParent}for(var r=e;r=i(r);){if(r&&typeof r.getScrollDelegate=="function"){return r.getScrollDelegate(e)}}};T.ScreenSizes={phone:240,tablet:600,desktop:1024,xxsmall:240,xsmall:320,small:480,medium:560,large:768,xlarge:960,xxlarge:1120};m(T,"BaseFontSize",function(){T.BaseFontSize=s(document.documentElement).css("font-size")||"16px";return T.BaseFontSize});T.closeKeyboard=function(){var a=document.activeElement;if(!e.system.desktop&&a&&/(INPUT|TEXTAREA)/i.test(a.tagName)){a.blur()}};T.touch=T.touch||{};T.touch.find=function(e,a){var t,n;if(!e){return}if(a&&typeof a.identifier!=="undefined"){a=a.identifier}else if(typeof a!=="number"){l(false,"sap.m.touch.find(): oTouch must be a touch object or a number");return}n=e.length;for(t=0;t<n;t++){if(e[t].identifier===a){return e[t]}}};T.touch.countContained=function(e,a){var t,n=0,i,r,o;if(!e){return 0}if(a instanceof Element){a=s(a)}else if(typeof a==="string"){a=s(document.getElementById(a))}else if(!(a instanceof s)){l(false,"sap.m.touch.countContained(): vElement must be a jQuery object or Element reference or a string");return 0}r=a.children().length;i=e.length;for(t=0;t<i;t++){o=s(e[t].target);if(r===0&&o.is(a)||a[0].contains(o[0])){n++}}return n};T.URLHelper=function(){function a(e){return e&&Object.prototype.toString.call(e)=="[object String]"}function n(e){if(!a(e)){return""}return e.replace(/[^0-9\+\*#]/g,"")}function i(e){if(!a(e)){return""}e=e.split(/\r\n|\r|\n/g).join("\r\n");return encodeURIComponent(e)}return s.extend(new t,{normalizeTel:function(e){return"tel:"+n(e)},normalizeSms:function(e){return"sms:"+n(e)},normalizeEmail:function(e,t,n,r,o){var l=[],p="mailto:",m=encodeURIComponent;a(e)&&(p+=m(s.trim(e)));a(t)&&l.push("subject="+m(t));a(n)&&l.push("body="+i(n));a(o)&&l.push("bcc="+m(s.trim(o)));a(r)&&l.push("cc="+m(s.trim(r)));if(l.length){p+="?"+l.join("&")}return p},redirect:function(t,n){l(a(t),this+"#redirect: URL must be a string");this.fireEvent("redirect",t);if(!n){window.location.href=t}else{var i=window.open(t,"_blank");if(!i){p.error(this+"#redirect: Could not open "+t);if(e.os.windows_phone||e.browser.edge&&e.browser.mobile){p.warning("URL will be enforced to open in the same window as a fallback from a known Windows Phone system restriction. Check the documentation for more information.");window.location.href=t}}}},attachRedirect:function(e,a){return this.attachEvent("redirect",e,a)},detachRedirect:function(e,a){return this.detachEvent("redirect",e,a)},triggerTel:function(e){this.redirect(this.normalizeTel(e))},triggerSms:function(e){this.redirect(this.normalizeSms(e))},triggerEmail:function(e,a,t,n,i){this.redirect(this.normalizeEmail.apply(0,arguments))},toString:function(){return"sap.m.URLHelper"}})}();T.BackgroundHelper={addBackgroundColorStyles:function(e,t,n,i){e.class(i||"sapUiGlobalBackgroundColor");if(t&&!a.getType("sap.ui.core.CSSColor").isValid(t)){p.warning(t+" is not a valid sap.ui.core.CSSColor type");t=""}if(t||n){e.style("background-image","none");e.style("filter","none")}if(t){e.style("background-color",t)}},renderBackgroundImageTag:function(e,a,t,n,i,r){e.openStart("div",a.getId()+"-BG");if(Array.isArray(t)){for(var o=0;o<t.length;o++){e.class(t[o])}}else{e.class(t)}e.class("sapUiGlobalBackgroundImage");if(n){e.style("display","block");e.style("background-image","url("+u(n)+")");e.style("background-repeat",i?"repeat":"no-repeat");if(!i){e.style("background-size","cover");e.style("background-position","center")}else{e.style("background-position","left top")}}if(r!==1){if(r>1){r=1}e.style("opacity",r)}e.openEnd();e.close("div")}};T.ImageHelper=function(){function e(e,a,t){if(t!==undefined){var n=e["set"+o(a)];if(typeof n==="function"){n.call(e,t);return true}}return false}var a={getImageControl:function(a,t,n,i,r,o){l(i.src,"sap.m.ImageHelper.getImageControl: mProperties do not contain 'src'");if(t&&t.getSrc()!=i.src){t.destroy();t=undefined}if(t&&(t instanceof sap.m.Image||t instanceof sap.ui.core.Icon)){for(var s in i){e(t,s,i[s])}}else{var p=sap.ui.require("sap/m/Image")||sap.ui.requireSync("sap/m/Image");var m=Object.assign({},i,{id:a});t=sap.ui.core.IconPool.createControlByURI(m,p);t.setParent(n,null,true)}if(o){for(var u=0,c=o.length;u!==c;u++){t.removeStyleClass(o[u])}}if(r){for(var d=0,g=r.length;d!==g;d++){t.addStyleClass(r[d])}}return t}};return a}();T.PopupHelper={calcPercentageSize:function(e,a){if(typeof e!=="string"){p.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+e+"isn't with type string");return null}if(e.indexOf("%")<=0){p.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+e+"is not a percentage string (for example '25%')");return null}var t=parseFloat(e)/100,n=parseFloat(a);return Math.floor(t*n)+"px"}};T.InputODataSuggestProvider=function(){var e=function(e){var a=e.getSource();var t=a.data(a.getId()+"-#valueListAnnotation");var n=a.getModel();var i=a.getBinding("value");var r=n.resolve(i.getPath(),i.getContext());if(!t){return}var o=e.getParameter("selectedRow");s.each(o.getCells(),function(e,a){var o=a.getBinding("text");s.each(t.outParameters,function(e,a){if(!a.displayOnly&&a.value==o.getPath()){var t=o.getValue();var s=n.resolve(e,i.getContext());if(t&&s!==r){n.setProperty(s,t)}}})});return true};var a=function(a,t){var n=a.getModel();var i=n.oMetadata;var r=n.resolve(a.getBindingPath("value"),a.getBindingContext());var o={};o.searchSupported=false;o.collectionPath="";o.outParameters={};o.inParameters={};o.selection=[];var l=n.getProperty(r+"/#com.sap.vocabularies.Common.v1.ValueList");if(!l){return false}var p=r.substr(r.lastIndexOf("/")+1);o.inProperty=p;s.each(l.record,function(e,a){s.each(a,function(e,a){if(a.property==="SearchSupported"&&a.bool){o.searchSupported=true}if(a.property==="CollectionPath"){o.collectionPath=a.string}if(a.property==="Parameters"){s.each(a.collection.record,function(e,a){if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){var t;s.each(a.propertyValue,function(e,a){if(a.property==="LocalDataProperty"){t=a.propertyPath}});s.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){o.inParameters[t]={value:a.string}}})}else if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"){var t;s.each(a.propertyValue,function(e,a){if(a.property==="LocalDataProperty"){t=a.propertyPath}});s.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){o.outParameters[t]={value:a.string};o.inParameters[t]={value:a.string}}})}else if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){var t;s.each(a.propertyValue,function(e,a){if(a.property==="LocalDataProperty"){t=a.propertyPath}});s.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){o.outParameters[t]={value:a.string}}})}else if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){var t;s.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){o.outParameters[a.string]={value:a.string,displayOnly:true}}})}})}})});o.resultEntity=i._getEntityTypeByPath("/"+o.collectionPath);o.listItem=new sap.m.ColumnListItem;s.each(o.outParameters,function(e,t){o.listItem.addCell(new sap.m.Text({text:"{"+t.value+"}",wrapping:false}));a.addSuggestionColumn(new sap.m.Column({header:new sap.m.Text({text:"{/#"+o.resultEntity.name+"/"+t.value+"/@sap:label}",wrapping:false})}));o.selection.push(t.value)});a.data(a.getId()+"-#valueListAnnotation",o);if(t){a.attachSuggestionItemSelected(e)}};var t={suggest:function(e,t,n,i){var r,o=e.getSource();t=t===undefined?true:t;n=n===undefined?true:n;if(!o.data(o.getId()+"-#valueListAnnotation")){a(o,n)}r=o.data(o.getId()+"-#valueListAnnotation");if(!r){return}var p=function(e){var a=this.getLength();if(a&&a<=i){o.setShowTableSuggestionValueHelp(false)}else{o.setShowTableSuggestionValueHelp(true)}};if(r.searchSupported){var m=[];var u,c={};if(t){s.each(r.inParameters,function(e,a){if(e==r.inProperty){u=a.value}else if(t){var n=o.getModel().getProperty(e,o.getBinding("value").getContext());if(n){m.push(new sap.ui.model.Filter(a.value,sap.ui.model.FilterOperator.StartsWith,n))}}})}c.search=e.getParameter("suggestValue");if(r.inParameters.length){if(u){c["search-focus"]=u}else{l(false,"no search-focus defined")}}o.bindAggregation("suggestionRows",{path:"/"+r.collectionPath,length:i,filters:m,parameters:{select:r.selection.join(","),custom:c},events:{dataReceived:p},template:r.listItem})}else{var m=[];s.each(r.inParameters,function(a,n){if(a==r.inProperty){m.push(new sap.ui.model.Filter(n.value,sap.ui.model.FilterOperator.StartsWith,e.getParameter("suggestValue")))}else if(t){var i=o.getModel().getProperty(a,o.getBinding("value").getContext());if(i){m.push(new sap.ui.model.Filter(n.value,sap.ui.model.FilterOperator.StartsWith,i))}}});o.bindAggregation("suggestionRows",{path:"/"+r.collectionPath,filters:m,template:r.listItem,length:i,parameters:{select:r.selection.join(",")},events:{dataReceived:p}})}}};return t}();i.set("sap.ui.layout.form.FormHelper",{createLabel:function(e,a){return new sap.m.Label(a,{text:e})},createButton:function(e,a,t){var n=this;var i=function(i){var r=new i(e,{type:T.ButtonType.Transparent});r.attachEvent("press",a,n);t.call(n,r)};var r=sap.ui.require("sap/m/Button");if(r){i(r)}else{sap.ui.require(["sap/m/Button"],i)}},setButtonContent:function(e,a,t,n,i){e.setText(a);e.setTooltip(t);e.setIcon(n);e.setActiveIcon(i)},addFormClass:function(){return"sapUiFormM"},setToolbar:function(e){var a=this.getToolbar();if(a&&a.setDesign){a.setDesign(a.getDesign(),true)}if(e&&e.setDesign){e.setDesign(sap.m.ToolbarDesign.Transparent,true)}return e},getToolbarTitle:function(e){if(e){var a=e.getContent();for(var t=0;t<a.length;t++){var n=a[t];if(n.isA("sap.m.Title")){return n.getId()}}return e.getId()}},bArrowKeySupport:false,bFinal:true});i.set("sap.ui.unified.FileUploaderHelper",{createTextField:function(e){var a=new sap.m.Input(e);return a},setTextFieldContent:function(e,a){e.setWidth(a)},createButton:function(e){var a=new sap.m.Button(e);return a},addFormClass:function(){return"sapUiFUM"},bFinal:true});i.set("sap.ui.unified.ColorPickerHelper",{isResponsive:function(){return true},factory:{createLabel:function(e){return new sap.m.Label(e)},createInput:function(e,a){return new sap.m.InputBase(e,a)},createSlider:function(e,a){return new sap.m.Slider(e,a)},createRadioButtonGroup:function(e){return new sap.m.RadioButtonGroup(e)},createRadioButtonItem:function(e){return new sap.m.RadioButton(e)},createButton:function(e,a){return new sap.m.Button(e,a)}},bFinal:true});i.set("sap.ui.table.TableHelper",{createLabel:function(e){return new sap.m.Label(e)},createTextView:function(e){return new sap.m.Label(e)},addTableClass:function(){return"sapUiTableM"},bFinal:true});i.set("sap.ui.layout.GridHelper",{getLibrarySpecificClass:function(){return""},bFinal:true});if(e.os.blackberry||e.os.android&&e.os.version>=4){s(window).on("resize",function(){var e=document.activeElement;var a=e?e.tagName:"";if(a=="INPUT"||a=="TEXTAREA"){setTimeout(function(){e.scrollIntoViewIfNeeded()},0)}})}if(!Number.MAX_SAFE_INTEGER){Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1}return T});